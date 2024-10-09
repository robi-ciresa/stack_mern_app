const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware'); // Importa il middleware di protezione
const { getVolunteers, createVolunteer, deleteVolunteer } = require('../controllers/volunteerController');
const router = express.Router();

// @desc    Ottieni tutti i volontari
// @route   GET /api/volunteers
// @access  Pubblico
router.get('/', getVolunteers);

// @desc    Crea un nuovo volontario
// @route   POST /api/volunteers
// @access  Privato (solo Admin)
router.post('/', protect, admin, createVolunteer);

// @desc    Elimina un volontario
// @route   DELETE /api/volunteers/:id
// @access  Privato (solo Admin)
router.delete('/:id', protect, admin, deleteVolunteer);

module.exports = router;
