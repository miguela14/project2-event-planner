const router = require('express').Router();
const { Event, Registration, User } = require('../models');

// Get all events for homepage
router.get('/', async (req, res) => {
    try {
        const eventData = await Event.findAll({
            include: [User],
            order: [['date', 'time', 'ASC']]
        });
        const events = eventData.map((event) =>
      event.get({ plain: true })
    );
        res.render('homepage', {
            events,
            loggedIn: req.session.loggedIn,
          });
        } catch (err) {
          res.status(500).json(err);
        }
});
// Get one event by id
router.get('/event/:id', async (req, res) => {
    try {
      const eventData = await Event.findByPk(req.params.id, {
        include: [
          {
            model: 'Event',
            attributes: [
              'id',
              'title',
              'description',
              'date',
              'time',
              'location',
            ],
          },
        ],
      });
  
      const events = eventData.get({ plain: true });
      res.render('events', { 
        events, 
        loggedIn: req.session.loggedIn 
        });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  
  module.exports = router;