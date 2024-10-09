const mongoose = require('mongoose');

const puppySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The puppy\'s name is required']
    },
    sex: {
        type: String,
        enum: ['male', 'female'],
        required: [true, 'The puppy\'s sex is required']
    },
    age: {
        type: Number,
        required: [true, 'The puppy\'s age is required']
    },
    adopted: {
        type: Boolean,
        default: false
    },
    distantAdopters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    imageUrl: {
        type: String,
        required: [true, 'The puppy\'s image is required']
    }
}, {
    timestamps: true
});

const Puppy = mongoose.model('Puppy', puppySchema);

module.exports = Puppy;