// src/prismaClient.js
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

// 1. Configuramos la conexión estándar a PostgreSQL con la URL de Neon
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// 2. Creamos el adaptador oficial
const adapter = new PrismaPg(pool);

// 3. Instanciamos Prisma pasándole el adaptador (¡Tal como pedía el error!)
const prisma = new PrismaClient({ adapter });

module.exports = prisma;