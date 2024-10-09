const Volunteer = require('../models/Volunteer');

// @desc    Retrieve all volunteers
// @route   GET /api/volunteers
// @access  Public
const getVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.find();
        res.json(volunteers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new volunteer
// @route   POST /api/volunteers
// @access  Private (admin only)
const createVolunteer = async (req, res) => {
    const { name, description, phone, email } = req.body;

    const newVolunteer = new Volunteer({
        name,
        description,
        phone,
        email,
    });

    try {
        const savedVolunteer = await newVolunteer.save();
        res.status(201).json(savedVolunteer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a volunteer
// @route   DELETE /api/volunteers/:id
// @access  Private (admin only)
const deleteVolunteer = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedVolunteer = await Volunteer.findByIdAndDelete(id);
        if (!deletedVolunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }
        res.json({ message: 'Volunteer successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getVolunteers, createVolunteer, deleteVolunteer };