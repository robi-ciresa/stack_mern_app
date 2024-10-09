const User = require('../models/User');
const Puppy = require('../models/Puppy');
const AdoptionRequest = require('../models/AdoptionRequest');
const jwt = require('jsonwebtoken');

// Generate a JWT token for the authenticated user
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let isAdmin = false;

        // Check if the user is the default admin
        if (name === 'admin' && email === 'admin@example.com' && password === 'adminPassword123!') {
            isAdmin = true;
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already registered' });
        }

        const user = await User.create({ name, email, password, isAdmin });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate the user and provide a token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update the user's password
// @route   PUT /api/auth/update-password
// @access  Private
const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (user && (await user.matchPassword(oldPassword))) {
            user.password = newPassword;
            await user.save();
            res.json({ message: 'Password updated successfully' });
        } else {
            res.status(400).json({ message: 'Old password is incorrect' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user information
// @route   GET /api/auth/user
// @access  Private
const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get the user's adoptions (full and distance)
// @route   GET /api/auth/adoptions
// @access  Private
const getUserAdoptions = async (req, res) => {
    try {
        const userId = req.user._id;

        const distanceAdoptions = await Puppy.find({ distantAdopters: userId });
        const fullAdoptions = await AdoptionRequest.find({ user: userId }).populate('puppy', 'name breed');

        res.json({ distanceAdoptions, fullAdoptions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update the total donations if the user is authenticated
// @route   PUT /api/auth/donate
// @access  Public
const donate = async (req, res) => {
    const { amount } = req.body;

    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount' });
    }

    if (req.user) {
        try {
            const user = await User.findById(req.user._id);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.totalDonations += amount;
            await user.save();

            return res.json({ 
                message: 'Donation recorded successfully, total donations updated', 
                totalDonations: user.totalDonations 
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } else {
        return res.json({ message: 'Donation received. Thank you for your support!' });
    }
};

module.exports = { registerUser, authUser, updateUserPassword, getUserInfo, getUserAdoptions, donate };