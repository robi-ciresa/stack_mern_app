const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cron = require('node-cron');
const User = require('./models/User');  
const Puppy = require('./models/Puppy');  

// Import routes
const userRoutes = require('./routes/authRoutes');
const puppyRoutes = require('./routes/puppyRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Log requests in development mode
}

// Use routes
app.use('/api/auth', userRoutes);
app.use('/api/puppies', puppyRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/contact', contactRoutes);

// Base endpoint to check if the server is active
app.get('/', (req, res) => {
    res.send('API is active'); // Confirmation message that the API is running
});

// Simulate a weekly donation for each puppy adopted at a distance
cron.schedule('0 8 * * 0', async () => {
    try {
        const users = await User.find().populate('distantAdoptions');

        users.forEach(async (user) => {
            const donationAmount = user.distantAdoptions.length * 10; // 10 euros for each adopted puppy

            user.totalDonations += donationAmount; // Update total donations
            await user.save();
                
            // You can add a log or a message here to monitor donations
            console.log(`User: ${user.name}, Weekly Donation: €${donationAmount}, Total Donations: €${user.totalDonations}`);
        });
    } catch (error) {
        console.error('Error simulating payments:', error.message); // Error message in case of issues
    }
});

// Port and server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`); // Startup message for the server
});