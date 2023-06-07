const express = require('express');
const { MongoClient, ObjectId, ClientSession } = require('mongodb'); //ObjectId: Para poder trabajar con id
// const bodyparser = require('body-parser');
const movieService = require("../services/movieService");
require("dotenv").config();


const uri = process.env.URL;

const router = express.Router();

const service = new movieService();
/**
 * CRUD . CREATE , READ, UPDATE, DELETE
 */

//2. READ
//2.1 find()
router.get('/', async (req, res) => {
    
        const movies = service.findMany();
        if (movies) {
            res.status(200).send(movies);
        } else {
            res.status(404).send('No Fund');
        }
    
});

//2.1 findOne()
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    ClientSession;
    try {
        await client.connect();
        const movie = await client
            .db('sample_mflix')
            .collection('movies')
            .findOne({ _id: new ObjectId(id) });
        if (movie) {
            res.status(200).send(movie);
        } else {
            res.status(404).send('No se encontro la pelicula');
        }
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
});

//1. CREATE
// 1.1 insertOne()
router.post('/', async (req, res) => {
    const body = req.body;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client
            .db('sample_mflix')
            .collection('movies')
            .insertOne(body);
        if (result) {
            res.status(201).json({
                message: 'Se creo la pelicula en la Base de Datos',
                result,
                //data: body
            });
        } else {
            res.status(404).send('No se creo la pelicula');
        }
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
});

//1.2 insertMany()
router.post('/', async (req, res) => {
    const body = req.body;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client
            .db('sample_mflix')
            .collection('movies')
            .insertMany(body);
        if (result) {
            res.status(201).json({
                message: 'Se crearon las pelicula en la Base de Datos',
                result,
                //data: body
            });
        } else {
            res.status(400).send('No se creo la pelicula');
        }
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
});

//3. UPDATE
// updateOne() Actualizamos solo un campo
// router.patch('/:id', async (req, res) => {
//     const id = req.params.id;
//     const {title, year} = req.body;

//     const resultado = await service.actualizarPelicula(id, title, year);

//     if (result) {
//         res.status(200).json({
//             message: 'Se actualizo la pelicula',
//             result,
//             //data: body
//         });
//     } else {
//         res.status(400).send('No se actualizo la pelicula');
//     }
// });

// DELETE
// deleteOne() Actualizamos solo un documento
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client
            .db('sample_mflix')
            .collection('movies')
            .deleteOne({ _id: new ObjectId(id) });
        if (result) {
            res.status(201).json({
                message: 'Se borro la pelicula',
                result,
                //data: body
            });
        } else {
            res.status(400).send('No se actualizo la pelicula');
        }
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
});

module.exports = router;
