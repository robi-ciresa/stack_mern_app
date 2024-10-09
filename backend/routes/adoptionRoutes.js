const express = require('express');
const router = express.Router();
const { protect, admin, normalUser } = require('../middleware/authMiddleware');
const {
    createAdoptionRequest,
    updateAdoptionRequest,
    getAllAdoptionRequests,
    getPendingAdoptionRequests,
} = require('../controllers/adoptionController');

// @route   POST /api/adoptions
// @desc    Create a new adoption request
// @access  Private (normal user)
router.post('/', protect, normalUser, createAdoptionRequest);

// @route   PUT /api/adoptions/:id
// @desc    Update the status of an adoption request (admin only)
// @access  Private/Admin
router.put('/:id', protect, admin, updateAdoptionRequest);

// @route   GET /api/adoptions
// @desc    Get all adoption requests (admin only)
// @access  Private/Admin
router.get('/', protect, admin, getAllAdoptionRequests);

// @route   GET /api/adoptions/pending
// @desc    Get all adoption requests with status 'pending' (admin only)
// @access  Private/Admin
router.get('/pending', protect, admin, getPendingAdoptionRequests);

module.exports = router;