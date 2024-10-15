const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'] 
    }, 
    text: { 
        type: String, 
        required: [true, 'Text is required'] 
    },
    rating: { 
        type: Number, 
        required: [true, 'Rating is required'], 
        min: [1, 'Rating must be at least 1'], 
        max: [5, 'Rating must be at most 5'] 
    }, 
    createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;