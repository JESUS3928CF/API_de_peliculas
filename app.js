const express = require('express');
const { MongoClient, ObjectId, ClientSession } = require('mongodb'); //ObjectId: Para poder trabajar con id
const bodyparser = require('body-parser');
require("dotenv").config();
/// Funciones para llamar las rutas.
const routerApi = require("./routes/index");




const app = express();

//Middlewares
app.use(bodyparser.json()); //para poder trabajar con json
app.use(bodyparser.urlencoded({ extended: true })); //para poder trabajar con formularios codificados en url
app.use(express.json()); //para poder trabajar con json

/// Usando la función que disecciona nuestras peticiones
routerApi(app);

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.status(200).send('API de peliculas');
});

app.listen(port, () => {
    console.log(`El servidor esta escuchando en http://localhost:${port}`);
});

