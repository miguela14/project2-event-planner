const router = require('express').Router();
const { Event, Registration } = require('../../models');


// Create new event
router.post('/', async (req,res) => {
    try {
        const eventData = await Event.create(req.body);
        res.status(200).json(eventData);
    } catch (err) {
        res.status(500).json({ err: 'Failed to create event.' + err});
    }
});

// Update event by 'id'
router.put('/:id', async (req,res) => {
    try {
        const eventData = await Event.update(req.body, {
            where: {
                id: req.params.id
            },
        });
        res.status(200).json(eventData);
    } catch (err) {
        res.status(500).json({ err: 'Failed to update event.'})
    }
});

// Delete event 'id'
router.delete('/:id', async (req,res) => {
    try {
        await Registration.destroy({
            where: {
                event_id: req.params.id
            }
        });
        await Event.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: 'Event deleted succesfully.'})
    } catch (err) {
        req.status(500).json({ err: 'Failed to delete event'})
    }
});

module.exports = router;