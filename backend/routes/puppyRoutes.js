const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    getPuppies,
    getPuppyById,
    createPuppy,
    updatePuppy,
    deletePuppy,
    adoptPuppyAtDistance
} = require('../controllers/puppyController');

// @desc    Get all puppies
// @route   GET /api/puppies
// @access  Public
router.route('/').get(getPuppies);

// @desc    Get a puppy by ID
// @route   GET /api/puppies/:id
// @access  Public
router.route('/:id').get(getPuppyById);

// @desc    Create a new puppy (admin only)
// @route   POST /api/puppies
// @access  Private/Admin
router.route('/').post(protect, admin, createPuppy);

// @desc    Update a puppy (admin only)
// @route   PUT /api/puppies/:id
// @access  Private/Admin
router.route('/:id').put(protect, admin, updatePuppy);

// @desc    Delete a puppy (admin only)
// @route   DELETE /api/puppies/:id
// @access  Private/Admin
router.route('/:id').delete(protect, admin, deletePuppy);

// @desc    Adopt a puppy at distance
// @route   POST /api/puppies/:id/adopt
// @access  Private (registered users)
router.post('/:id/adopt', protect, adoptPuppyAtDistance);

module.exports = router;
