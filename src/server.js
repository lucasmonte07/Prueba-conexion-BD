import express from 'express';
import sql from 'mssql';
import cors from 'cors';

const app = express();
const port = 5000; // Puedes elegir otro puerto si prefieres

app.use(cors()); // Habilitar CORS para que el frontend pueda acceder a la API

// Configuración de la base de datos
const config = {
    user: 'charliev',
    password: 'lucas13572468',
    server: 'localhost', // Por ejemplo: localhost o una IP
    database: 'FCDP',
    options: {
        encrypt: false, // Si estás usando Azure, establece esto en true
        trustServerCertificate: true // Recomendado para entornos de desarrollo
    }
};

// Ruta para obtener datos de la tabla
app.get('/api/datos', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * FROM BBB');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});