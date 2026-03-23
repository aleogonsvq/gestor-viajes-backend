// src/controllers/itineraryController.js
const prisma = require('../prismaClient');

// Crear un nuevo itinerario (viaje) para un cliente
const createItinerary = async (req, res) => {
    try {
        const { name, status, clientId } = req.body;

        const newItinerary = await prisma.itinerary.create({
            data: {
                name,
                // Si no nos envían estado, Prisma pondrá "DRAFT" (Borrador) por defecto según nuestro schema
                status: status || "DRAFT", 
                clientId: parseInt(clientId)
            }
        });

        res.status(201).json({
            mensaje: 'Itinerario creado con éxito',
            itinerario: newItinerary
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al crear el itinerario. Verifica que el clientId exista.' });
    }
};

// Obtener todos los itinerarios de un cliente específico
const getItinerariesByClient = async (req, res) => {
    try {
        const { clientId } = req.params;

        const itineraries = await prisma.itinerary.findMany({
            where: {
                clientId: parseInt(clientId)
            },
            // ¡Magia de Prisma! Podemos pedirle que nos traiga también los vuelos de este viaje,
            // aunque de momento este array nos llegará vacío porque aún no hemos creado vuelos.
            include: {
                flights: true 
            }
        });

        res.status(200).json(itineraries);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los itinerarios' });
    }
};

// Actualizar un itinerario
const updateItinerary = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;
        
        const updatedItinerary = await prisma.itinerary.update({
            where: { id: parseInt(id) },
            data: { name, status }
        });
        res.status(200).json(updatedItinerary);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el itinerario' });
    }
};

// Eliminar un itinerario
const deleteItinerary = async (req, res) => {
    try {
        const { id } = req.params;
        // Al borrar el itinerario, Prisma borrará sus vuelos automáticamente
        // gracias a la relación "onDelete: Cascade" que pusimos en la base de datos.
        await prisma.itinerary.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ mensaje: 'Itinerario eliminado' });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el itinerario' });
    }
};

module.exports = {
    createItinerary,
    getItinerariesByClient,
    updateItinerary,   // <--- NUEVO
    deleteItinerary    // <--- NUEVO
};