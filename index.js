const express = require('express');
const { getConnection } = require('./db/db-connection-mongo');
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

getConnection();

// Rutas para apis
app.use('/moduloDirector', require('./routes/moduloDirector'));
app.use('/moduloGenero', require('./routes/moduloGenero'));
app.use('/moduloTipo', require('./routes/moduloTipo'));
app.use('/moduloMedia', require('./routes/moduloMedia')); // Agrega esta línea
app.use('/moduloProductora', require('./routes/moduloProductora'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});