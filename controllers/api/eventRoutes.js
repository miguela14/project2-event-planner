const router = require('express').Router();
const { Event } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new event
// POST: /api/events/
router.post('/', async (req, res) => {
    try {
        const eventData = await Event.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(eventData);
    } catch (err) {
        res.status(500).json({ err: 'Failed to create event.' + err });
    }
});

// Update event by 'id'
// PUT: /api/events/:id
router.put('/:id', withAuth, async (req, res) => {
    try {
        const eventData = await Event.update(req.body, {
            where: {
                id: req.params.id
            },
        });

        res.status(200).json(eventData);
    } catch (err) {
        res.status(500).json({ err: 'Failed to update event.' })
    }
});

// DELETE: /api/events/:id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const eventData = await Event.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!eventData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }

        res.status(200).json(eventData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;