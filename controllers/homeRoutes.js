const router = require('express').Router();
const { Event, User } = require('../models');
const withAuth = require('../utils/auth');

// Get all events for homepage
// GET: /
router.get('/', async (req, res) => {
  try {
    const eventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const events = eventData.map((event) => event.get({ plain: true }));

    res.render('homepage', {
      events,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one event by id
// GET: /events/:id
router.get('/events/:id', withAuth, async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const events = eventData.get({ plain: true });

    res.render('events', {
      ...events,
      loggedIn: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// User withAuth to prevent access to route
// GET: /profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    const eventsData = await Event.findAll({
      where: { user_id: req.session.user_id },
    });

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Event }],
    });

    const user = userData.get({ plain: true });
    const events = eventsData.map((event) => event.get({ plain: true }));

    res.render('profile', {
      events,
      user,
      logged_in: true,
      userEmail: req.session.email
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
// GET: /login
router.get('/login', (req, res) => {
  // Redirect if already logged in.
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

module.exports = router;