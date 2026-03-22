// src/controllers/flightController.js
const prisma = require('../prismaClient');

// Añadir un tramo de vuelo a un itinerario
const createFlight = async (req, res) => {
    try {
        const { origin, destination, departureTime, arrivalTime, airline, flightNumber, itineraryId } = req.body;

        const newFlight = await prisma.flightSegment.create({
            data: {
                origin,
                destination,
                // Convertimos el texto a un objeto Fecha que la base de datos entienda
                departureTime: new Date(departureTime), 
                arrivalTime: new Date(arrivalTime),
                airline,
                flightNumber,
                itineraryId: parseInt(itineraryId)
            }
        });

        res.status(201).json({
            mensaje: 'Vuelo añadido correctamente al itinerario',
            vuelo: newFlight
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al añadir el vuelo. Verifica los datos de fecha y el itineraryId.' });
    }
};

// Ver todos los vuelos de un itinerario específico
const getFlightsByItinerary = async (req, res) => {
    try {
        const { itineraryId } = req.params;

        const flights = await prisma.flightSegment.findMany({
            where: {
                itineraryId: parseInt(itineraryId)
            },
            // ¡Truco de experto! Le decimos a la base de datos que nos los devuelva
            // ordenados cronológicamente por fecha de salida.
            orderBy: {
                departureTime: 'asc'
            }
        });

        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los vuelos' });
    }
};

module.exports = {
    createFlight,
    getFlightsByItinerary
};