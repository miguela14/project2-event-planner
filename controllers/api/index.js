const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const nodemailerRoutes = require('./nodemailerRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/nodemailer', nodemailerRoutes);

module.exports = router;

