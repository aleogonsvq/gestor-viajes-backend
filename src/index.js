// 1. Importar las dependencias necesarias
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Carga las variables de tu archivo .env

// 2. Inicializar la aplicación Express
const app = express();

// 3. Middlewares (Filtros por los que pasa la información antes de llegar a tus rutas)
app.use(cors()); // Permite que tu frontend en Vue se comunique con este backend
app.use(express.json()); // Permite a Express entender los datos que lleguen en formato JSON

// 4. Rutas Básicas (Endpoint de prueba)
// Cuando alguien entre a la raíz de la API, le responderemos con un mensaje
app.get('/api', (req, res) => {
    res.json({
        mensaje: '¡Hola Alberto! El servidor del Gestor de Rutas está funcionando perfectamente ✈️',
        estado: 'OK',
        fecha: new Date().toISOString()
    });
});


// ==========================================
// NUEVAS RUTAS CONECTADAS
// ==========================================
const agentRoutes = require('./routes/agentRoutes');
// Le decimos a Express: "Todo lo que empiece por /api/agentes, mándalo a agentRoutes"
app.use('/api/agentes', agentRoutes);



// 5. Definir el puerto y arrancar el servidor
// Coge el puerto del archivo .env, y si no lo encuentra, usa el 3000 por defecto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
    console.log(`➡️  Ruta de prueba: http://localhost:${PORT}/api`);
});