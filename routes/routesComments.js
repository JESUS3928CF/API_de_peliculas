const express = require('express');
const { MongoClient, ObjectId, ClientSession } = require('mongodb'); //ObjectId: Para poder trabajar con id
const bodyparser = require('body-parser');

const uri =
    'mongodb+srv://jesus3928cf:1234@cluster0.6sahaj9.mongodb.net/?retryWrites=true&w=majority';

const router = express.Router();

router.get('/', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const movies = await client
            .db('sample_mflix')
            .collection('comments')
            .find({})
            .limit(10)
            .toArray();
        if (movies) {
            res.status(200).send(movies);
        } else {
            res.status(200).send('No se encontro la informacion');
        }
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
});

module.exports = router;
