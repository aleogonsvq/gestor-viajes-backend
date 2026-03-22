// src/controllers/clientController.js
const prisma = require('../prismaClient');

// Crear un nuevo cliente asociado a un agente
const createClient = async (req, res) => {
    try {
        const { name, email, phone, notes, agentId } = req.body;

        const newClient = await prisma.client.create({
            data: {
                name,
                email,
                phone,
                notes,
                agentId: parseInt(agentId) // Nos aseguramos de que sea un número
            }
        });

        res.status(201).json({
            mensaje: 'Cliente creado correctamente',
            cliente: newClient
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al crear el cliente. Verifica los datos y que el agentId exista.' });
    }
};

// Obtener todos los clientes de un agente específico
const getClientsByAgent = async (req, res) => {
    try {
        const { agentId } = req.params; // Lo sacaremos de la URL

        const clients = await prisma.client.findMany({
            where: {
                agentId: parseInt(agentId)
            }
        });

        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};

module.exports = {
    createClient,
    getClientsByAgent
};