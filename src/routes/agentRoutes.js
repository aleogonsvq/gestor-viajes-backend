// src/routes/agentRoutes.js
const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');

// Definimos qué función se ejecuta según el tipo de petición (POST o GET)
router.post('/', agentController.createAgent); // Para crear
router.get('/', agentController.getAgents);    // Para leer

module.exports = router;