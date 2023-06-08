const router = require('express').Router();
const { Event, User, Registration } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    // TODO: Get all events and JOIN with user data
});

router.get('/event/:id', async (req, res) => {
    // TODO: Get an event by id
});

router.get('/profile', withAuth, async (req, res) => {
    // TODO: Get profile info if logged in
})

router.get('/login', (req, res) => {
    // TODO: If user is already logged in, redirect the request to /profile
})