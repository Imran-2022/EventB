const express = require('express');
const { Event } = require('../models/event');
const authorize = require('../middlewares/authorize');
const router = express.Router();


const newEvent = async (req, res) => {
    const event = new Event(req.body);
    try {
        await event.save();
        return res.status(201).send("Event crated");
    } catch (err) {
        return res.status(400).send("Sorry! want wrong");
    }
}


const eventList = async (req, res) => {
    const events = await Event.find({ userId: req.user.id }).sort({ date: -1 });
    res.send(events);

}

const allEvents = async (req, res) => {
    const events = await Event.find();
    res.send(events);
}

// Delete an event by ID
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).send('Event not found');

        // Check if the logged-in user is the owner of the event
        if (event.userId.toString() !== req.user.id) {
            return res.status(403).send('You are not authorized to delete this event');
        }

        await Event.deleteOne({ _id: req.params.id }); // Use deleteOne instead of remove
        res.send('Event deleted');
    } catch (error) {
        console.error('Error while deleting event:', error.message);
        res.status(500).send('Server error');
    }
};
// Get a single event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).send('Event not found');

        // Check if the logged-in user is the owner of the event
        if (event.userId.toString() !== req.user.id) {
            return res.status(403).send('You are not authorized to view this event');
        }

        res.send(event);
    } catch (error) {
        console.error('Error while fetching event:', error.message);
        res.status(500).send('Server error');
    }
};

// Update an event by ID
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).send('Event not found');

        // Check if the logged-in user is the owner of the event
        if (event.userId.toString() !== req.user.id) {
            return res.status(403).send('You are not authorized to edit this event');
        }

        // Update the event details
        Object.assign(event, req.body);
        await event.save();
        
        res.send('Event updated');
    } catch (error) {
        console.error('Error while updating event:', error.message);
        res.status(500).send('Server error');
    }
};

router.route('/')
    .get(authorize, eventList)
    .post(authorize, newEvent)

router.route('/all')
    .get(allEvents)

router.route('/:id')
    .get(authorize, getEventById)  // New route for getting a single event
    .put(authorize, updateEvent)    // New route for updating an event
    .delete(authorize, deleteEvent);

module.exports = router;