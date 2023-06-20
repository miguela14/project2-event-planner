const router = require('express').Router();
const nodemailer = require('nodemailer');
const { Event, User } = require('../../models');

// POST: /api/nodemailer/send-email
router.post('/send-email', async (req, res) => {
    try {
        const { eventId, emailAddresses } = req.body;

        console.log(eventId, emailAddresses);

        const eventData = await Event.findByPk(eventId, {
            include: [{ model: User, attributes: ['username'] }],
        });

        const emailBody = `Event Title: ${eventData.title}\nDescription: ${eventData.description}\nCreated by: ${eventData.User.username}\nStart Time: ${eventData.start_time}\nEnd Time: ${eventData.end_time}\nLocation: ${eventData.location}`;

        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: emailAddresses,
            subject: 'Invitation to Event',
            text: emailBody,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            console.log(emailAddresses);
            if (error) {
                console.log('Error occurred:', error.message);
                res.status(500).json({ error: 'Failed to send email' });
            } else {
                console.log('Email sent successfully');
            }
        });
    } catch (error) {
        console.log('Error occurred:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = router;