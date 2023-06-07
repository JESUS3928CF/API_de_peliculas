const express = require('express');
const { MongoClient, ObjectId, ClientSession } = require('mongodb'); //ObjectId: Para poder trabajar con id
const bodyparser = require('body-parser');
require("dotenv").config();

const uri = process.env.URL;

const router = express.Router();

router.get('/', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const movies = await client
            .db('sample_mflix')
            .collection('users')
            .find({})
            .limit(10)
            .toArray();
        if (users) {
            res.send(users);
        } else {
            res.send('No se encontró la información');
        }
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
});

module.exports = router;
