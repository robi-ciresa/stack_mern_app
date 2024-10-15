const express = require('express');
const router = express.Router();
const { registerUser, authUser, updateUserPassword, getUserAdoptions, getUserInfo, donate } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// @desc    Register a user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', registerUser);

// @desc    Log in a user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', authUser);

// @desc    Update the password of the authenticated user
// @route   PUT /api/auth/update-password
// @access  Private
router.put('/update-password', protect, updateUserPassword);

// @desc    Get the user's adoptions
// @route   GET /api/auth/adoptions
// @access  Private
router.get('/adoptions', protect, getUserAdoptions);

// @desc    Get user information
// @route   GET /api/auth/user
// @access  Private
router.get('/user', protect, getUserInfo);

// @desc    Accept donations
// @route   PUT /api/auth/donate
// @access  Private
router.put('/donate',protect, donate);

module.exports = router;