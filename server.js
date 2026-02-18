require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const portCors = process.env.PORT_CORS || 3001;
const connectDB = require('./src/infrastructure/database');
const pedidosRoutes = require('./src/app/routes/pedidoRoutes');

// Conectar a la base de datos
connectDB();

//Middleware
app.use(express.json());

//Rutas
app.use('/api/pedidos', pedidosRoutes);  

//Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
});