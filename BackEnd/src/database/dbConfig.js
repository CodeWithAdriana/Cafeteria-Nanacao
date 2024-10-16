require('dotenv').config();
const { Pool } = require('pg');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cafeteria',
    password: '1234',
    allowExitOnIdle: true,
});


async function verificarConexion() {
    try {
        const client = await database.connect();
        console.log('Conexión exitosa a la base de datos');
        client.release(); // Liberar el cliente
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

verificarConexion();

const initDB = async () => {
    await database.query(`
        CREATE TABLE IF NOT EXISTS cafes (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(20) NOT NULL
        );
    `);
};

const clearDB = async () => {
    await database.query(`
        DELETE FROM cafes;
    `);
};

module.exports = {
    database,
    query: (text, params) => database.query(text, params),
    initDB,
    clearDB
};