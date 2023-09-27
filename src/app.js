const express = require('express');
const { urlencoded, json } = require('express');
const app = express();
const connectionToDB = require('./database/config/database')

// Para poder trabajar con archivos json
app.use(urlencoded({ extended: false }));
app.use(json());

// Levantando el servidor
process.env.PORT = process.env.PORT || 3030;

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});

let categoryRouter = require('./routes/categoryRouter');

app.use('/api/category', categoryRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
  });