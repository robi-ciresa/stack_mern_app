const express = require('express');
const { getReviews, createReview } = require('../controllers/reviewController');

const router = express.Router();

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
router.get('/', getReviews);

// @desc    Create a new review (public, no authentication required)
// @route   POST /api/reviews
// @access  Public
router.post('/', createReview);

module.exports = router;