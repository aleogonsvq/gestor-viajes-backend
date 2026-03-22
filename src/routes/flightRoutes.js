// src/routes/flightRoutes.js
const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

// Ruta para añadir un vuelo (POST /api/vuelos)
router.post('/', flightController.createFlight);

// Ruta para ver los vuelos de un itinerario (GET /api/vuelos/itinerario/1)
router.get('/itinerario/:itineraryId', flightController.getFlightsByItinerary);

module.exports = router;