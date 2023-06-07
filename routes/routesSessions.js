const express = require('express');
const { MongoClient, ObjectId, ClientSession } = require('mongodb'); //ObjectId: Para poder trabajar con id
require("dotenv").config();

const uri = process.env.URL;

const router = express.Router();

router.get('/', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const movies = await client
            .db('sample_mflix')
            .collection('sessions')
            .find({})
            .limit(10)
            .toArray();
        if (movies) {
            res.send(movies);
        } else {
            res.send('No se encontro la informacion');
        }
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
});

module.exports = router;