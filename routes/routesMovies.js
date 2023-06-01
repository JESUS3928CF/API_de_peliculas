const express = require('express');
const { MongoClient, ObjectId, ClientSession } = require('mongodb'); //ObjectId: Para poder trabajar con id
// const bodyparser = require('body-parser');

const uri = 'mongodb+srv://jesus3928cf:1234@cluster0.6sahaj9.mongodb.net/?retryWrites=true&w=majority';

const router = express.Router();

/**
 * CRUD . CREATE , READ, UPDATE, DELETE
 */

//2. READ
//2.1 find()
router.get('/', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const movies = await client
            .db('sample_mflix')
            .collection('movies')
            .find({})
            .limit(10)
            .toArray();
        if (movies) {
            res.status(200).send(movies);
        } else {
            res.status(404).send('No se encontro la informacion');
        }
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
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
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client
            .db('sample_mflix')
            .collection('movies')
            .updateOne(
                { _id: new ObjectId(id) },
                { $set: { title: body, year: body.year } }
            );
        if (result) {
            res.status(201).json({
                message: 'Se actualizo la pelicula',
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
