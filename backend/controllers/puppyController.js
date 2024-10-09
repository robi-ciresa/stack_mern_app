const Puppy = require('../models/Puppy');
const User = require('../models/User');

// Helper function for error responses
const handleErrorResponse = (res, error, status = 500) => res.status(status).json({ message: error.message });

// @desc Get all puppies
// @route GET /api/puppies
// @access Public
const getPuppies = async (req, res) => {
    try {
        const puppies = await Puppy.find();
        res.json(puppies);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

// @desc Get a single puppy by ID
// @route GET /api/puppies/:id
// @access Public
const getPuppyById = async (req, res) => {
    try {
        const puppy = await Puppy.findById(req.params.id);
        if (!puppy) return res.status(404).json({ message: 'Cucciolo non trovato' });
        res.json(puppy);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

// @desc Create a new puppy
// @route POST /api/puppies
// @access Private (Admin)
const createPuppy = async (req, res) => {
    const { name, sex, age, imageUrl } = req.body;
    if (!name || !sex || !age || !imageUrl) return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });

    try {
        const newPuppy = new Puppy({ name, sex, age, imageUrl });
        const savedPuppy = await newPuppy.save();
        res.status(201).json(savedPuppy);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

// @desc Update an existing puppy
// @route PUT /api/puppies/:id
// @access Private (Admin)
const updatePuppy = async (req, res) => {
    try {
        const updatedPuppy = await Puppy.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPuppy) return res.status(404).json({ message: 'Cucciolo non trovato' });
        res.json(updatedPuppy);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

// @desc Delete a puppy
// @route DELETE /api/puppies/:id
// @access Private (Admin)
const deletePuppy = async (req, res) => {
    try {
        const deletedPuppy = await Puppy.findByIdAndDelete(req.params.id);
        if (!deletedPuppy) return res.status(404).json({ message: 'Cucciolo non trovato' });
        res.json({ message: 'Cucciolo eliminato con successo' });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

// @desc Adopt a puppy at distance
// @route POST /api/puppies/:id/adopt
// @access Private
const adoptPuppyAtDistance = async (req, res) => {
    try {
        const puppy = await Puppy.findById(req.params.id);
        if (!puppy) return res.status(404).json({ message: 'Cucciolo non trovato' });

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'Utente non trovato' });

        if (user.distantAdoptions.includes(puppy._id)) {
            return res.status(400).json({ message: 'Hai già adottato questo cucciolo a distanza' });
        }

        user.distantAdoptions.push(puppy._id);
        await user.save();

        if (!puppy.distantAdopters.includes(user._id)) {
            puppy.distantAdopters.push(user._id);
            await puppy.save();
        }

        res.json({ message: 'Cucciolo adottato a distanza con successo' });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

module.exports = {
    getPuppies,
    getPuppyById,
    createPuppy,
    updatePuppy,
    deletePuppy,
    adoptPuppyAtDistance
};