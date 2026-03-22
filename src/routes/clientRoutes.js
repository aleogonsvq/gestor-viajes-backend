// src/routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Ruta para crear un cliente
router.post('/', clientController.createClient);

// Ruta para ver los clientes de un agente (usamos un parámetro en la URL :agentId)
router.get('/agente/:agentId', clientController.getClientsByAgent);

module.exports = router;