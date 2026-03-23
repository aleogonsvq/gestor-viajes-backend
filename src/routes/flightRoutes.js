// src/routes/flightRoutes.js
const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

// Ruta para añadir un vuelo (POST /api/vuelos)
router.post('/', flightController.createFlight);

// Ruta para ver los vuelos de un itinerario (GET /api/vuelos/itinerario/1)
router.get('/itinerario/:itineraryId', flightController.getFlightsByItinerary);

// Rutas para editar y borrar vuelos
router.put('/:id', flightController.updateFlight);
router.delete('/:id', flightController.deleteFlight);

module.exports = router;