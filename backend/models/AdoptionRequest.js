const mongoose = require('mongoose');

const adoptionRequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    puppy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Puppy',
        required: true
    },
    type: {
        type: String,
        enum: ['distant', 'full'],
        default: 'full'
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    adoptionDate: {
        type: Date,
        default: Date.now
    }
});

const AdoptionRequest = mongoose.model('AdoptionRequest', adoptionRequestSchema);

module.exports = AdoptionRequest;