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

// Configurazione di CORS
const allowedOrigins = [
    'https://stack-mern-app-frontend-robertaciresa.onrender.com',
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'La politica CORS per questo sito non consente accesso dall\'origine specificata.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
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
    res.send('API is active');
});

// Simulate a weekly donation for each puppy adopted at a distance
cron.schedule('0 8 * * 0', async () => {
    try {
        const users = await User.find().populate('distantAdoptions');

        users.forEach(async (user) => {
            const donationAmount = user.distantAdoptions.length * 10; // 10 euro per ogni adozione a distanza

            user.totalDonations += donationAmount; // Aggiorna le donazioni totali
            await user.save();
                
            console.log(`User: ${user.name}, Weekly Donation: €${donationAmount}, Total Donations: €${user.totalDonations}`);
        });
    } catch (error) {
        console.error('Error simulating payments:', error.message); // Messaggio di errore in caso di problemi
    }
});

// Port and server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`); // Messaggio di avvio del server
});