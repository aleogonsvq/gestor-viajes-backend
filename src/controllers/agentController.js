// src/controllers/agentController.js
const prisma = require('../prismaClient');

// Función para crear un nuevo agente
const createAgent = async (req, res) => {
    try {
        // Extraemos los datos que nos enviará el frontend (o nosotros ahora de prueba)
        const { name, email, password } = req.body;

        // Le decimos a Prisma que inserte un registro en la tabla User
        const newAgent = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password // Más adelante, en la Fase 2, encriptaremos esto
            }
        });

        // Devolvemos el agente creado con código 201 (Creado exitosamente)
        res.status(201).json({
            mensaje: 'Agente creado correctamente',
            agente: newAgent
        });

    } catch (error) {
        console.error(error);
        // Si el email ya existe, Prisma lanzará un error que capturamos aquí
        res.status(400).json({ error: 'Hubo un error al crear el agente. ¿Quizás el email ya existe?' });
    }
};

// Función para ver todos los agentes
const getAgents = async (req, res) => {
    try {
        const agents = await prisma.user.findMany();
        res.status(200).json(agents);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los agentes' });
    }
};

module.exports = {
    createAgent,
    getAgents
};