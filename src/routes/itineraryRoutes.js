// src/routes/itineraryRoutes.js
const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

// Ruta para crear un itinerario (POST /api/itinerarios)
router.post('/', itineraryController.createItinerary);

// Ruta para ver los itinerarios de un cliente (GET /api/itinerarios/cliente/1)
router.get('/cliente/:clientId', itineraryController.getItinerariesByClient);

// Rutas para editar y borrar (usando el ID en la URL)
router.put('/:id', itineraryController.updateItinerary);
router.delete('/:id', itineraryController.deleteItinerary);

module.exports = router;