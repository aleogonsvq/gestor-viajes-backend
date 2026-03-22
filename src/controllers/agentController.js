// src/controllers/agentController.js
const prisma = require('../prismaClient');
const bcrypt = require('bcrypt'); // <--- NUEVO: Importamos bcrypt

// Función para crear un nuevo agente
const createAgent = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Generamos el "Salt" (nivel de complejidad de la encriptación, 10 es el estándar seguro)
        const salt = await bcrypt.genSalt(10);
        // 2. Encriptamos la contraseña
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAgent = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword // <--- Guardamos la versión encriptada, NO la original
            }
        });

        // 3. Por seguridad, no devolvemos la contraseña (ni siquiera la encriptada) en la respuesta
        delete newAgent.password;

        res.status(201).json({
            mensaje: 'Agente creado y contraseña encriptada correctamente',
            agente: newAgent
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Hubo un error al crear el agente.' });
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