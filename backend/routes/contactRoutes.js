const express = require('express');
const router = express.Router();
const sendEmail = require('../config/emailService'); // Import email service

// Endpoint for the "Contact Us" form
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Compose the email content
    const emailContent = `
      <h3>You have received a new message from ${name}</h3>
      <p>Email: ${email}</p>
      <p>Message:</p>
      <p>${message}</p>
    `;

    // Send the email using the nodemailer service
    await sendEmail({
      email: process.env.RECEIVING_EMAIL, 
      subject: `New message from ${name}`,
      message: emailContent,
    });

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error sending email.' });
  }
});

module.exports = router;
