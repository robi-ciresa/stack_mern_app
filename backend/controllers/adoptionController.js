const AdoptionRequest = require('../models/AdoptionRequest');
const Puppy = require('../models/Puppy');

// @desc    Create a new adoption request
// @route   POST /api/adoptions
// @access  Private (registered user)
const createAdoptionRequest = async (req, res) => {
    try {
        if (!req.user || req.user.isAdmin) {
            return res.status(403).json({ message: 'Only registered users can make adoption requests' });
        }

        const newRequest = new AdoptionRequest({
            ...req.body,
            user: req.user._id,
            status: 'pending'
        });

        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update the status of an adoption request (admin only)
// @route   PUT /api/adoptions/:id
// @access  Private/Admin
const updateAdoptionRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Only an administrator can update the status of requests' });
        }

        const updatedRequest = await AdoptionRequest.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Adoption request not found' });
        }

        if (status === 'approved') {
            const puppy = await Puppy.findById(updatedRequest.puppy);
            if (puppy) {
                puppy.adopted = true;
                await puppy.save();
            }
        }

        res.json(updatedRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all adoption requests (admin only)
// @route   GET /api/adoptions
// @access  Private/Admin
const getAllAdoptionRequests = async (req, res) => {
    try {
        const adoptionRequests = await AdoptionRequest.find()
            .populate('user', 'name email')
            .populate('puppy', 'name sex');
        res.json(adoptionRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all adoption requests with status 'pending' (admin only)
// @route   GET /api/adoptions/pending
// @access  Private/Admin
const getPendingAdoptionRequests = async (req, res) => {
    try {
        const pendingRequests = await AdoptionRequest.find({ status: 'pending' })
            .populate('user', 'name email')
            .populate('puppy', 'name sex');
        res.json(pendingRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAdoptionRequest,
    updateAdoptionRequest,
    getAllAdoptionRequests,
    getPendingAdoptionRequests
};