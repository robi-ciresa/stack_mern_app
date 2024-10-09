const Review = require('../models/Review');

// @desc    Retrieve all reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();  // Not necessary to populate the user
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Public
const createReview = async (req, res) => {
    const { name, text, rating } = req.body;

    if (!name || !text || !rating) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newReview = new Review({
        name,
        text,
        rating,
    });

    try {
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getReviews, createReview };