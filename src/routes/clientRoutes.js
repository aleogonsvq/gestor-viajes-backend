// src/routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Ruta para crear un cliente
router.post('/', clientController.createClient);

// Ruta para ver los clientes de un agente (usamos un parámetro en la URL :agentId)
router.get('/agente/:agentId', clientController.getClientsByAgent);
// Rutas para editar y borrar
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);
// Obtener un cliente específico por su ID
router.get('/:id', clientController.getClientById);
module.exports = router;