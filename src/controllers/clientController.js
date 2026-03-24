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
// Actualizar un cliente
const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, notes } = req.body;
        
        const updatedClient = await prisma.client.update({
            where: { id: parseInt(id) },
            data: { name, email, phone, notes }
        });
        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el cliente' });
    }
};

// Eliminar un cliente
const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        
        // 1. Primero borramos todos los itinerarios de este cliente
        await prisma.itinerary.deleteMany({
            where: { clientId: parseInt(id) }
        });
        
        // 2. Ahora ya podemos borrar al cliente sin que la base de datos se queje
        await prisma.client.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ mensaje: 'Cliente y sus viajes eliminados' });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el cliente' });
    }
};

// Obtener un solo cliente por su ID
const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await prisma.client.findUnique({
            where: { id: parseInt(id) }
        });
        
        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        
        res.status(200).json(client);
    } catch (error) {
        res.status(400).json({ error: 'Error al obtener el cliente' });
    }
};
module.exports = {
    createClient,
    getClientsByAgent,
    updateClient,    // <--- NUEVO
    deleteClient,
    getClientById
};