const router = require('express').Router();
const { Event, Registration, User } = require('../models');

// Get all events for homepage
router.get('/', async (req, res) => {
  try {
    const eventData = await Event.findAll({
      include: [User],
      order: [['date', 'ASC'], ['time', 'ASC']]
    });

    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve events.' + err });
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