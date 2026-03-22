// src/controllers/authController.js
const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscamos al agente por su email
        const agent = await prisma.user.findUnique({
            where: { email: email }
        });

        // Si no existe, devolvemos error 404 (Not Found)
        if (!agent) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // 2. Comparamos la contraseña que nos envían con la encriptada en la base de datos
        const validPassword = await bcrypt.compare(password, agent.password);
        
        // Si no coinciden, error 401 (Unauthorized)
        if (!validPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // 3. Si todo es correcto, generamos el Token JWT
        // Metemos dentro el ID y el Rol para usarlos luego, y le damos 24 horas de caducidad
        const token = jwt.sign(
            { id: agent.id, role: agent.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Devolvemos el token al frontend
        res.status(200).json({
            mensaje: '¡Login exitoso!',
            token: token,
            agente: {
                id: agent.id,
                name: agent.name,
                email: agent.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor durante el login' });
    }
};

module.exports = { login };