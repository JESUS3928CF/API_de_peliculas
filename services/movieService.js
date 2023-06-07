const express = require("express");
const { MongoClient, ObjectId, ClientSession } = require("mongodb"); //ObjectId: Para poder trabajar con id
// const bodyparser = require('body-parser');
require("dotenv").config();


const uri = process.env.URL;

class MovieService {
  constructor() {}
  //* CREATE
  //* READ
  //* UPDATE
  //* DELETE

  async findMany() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const movies = await client
            .db('sample_mflix')
            .collection('movies')
            .find({})
            .limit(10)
            .toArray();

        return movies;
    } catch (error) {
      console.log(error);
    } finally {
        await client.close
    }
  }

  // async actualizarPelicula(id,title, year){
    
  //   try {
  //     await client.connect();
  //     const result = await client
  //         .db('sample_mflix')
  //         .collection('movies')
  //         .updateOne(
  //             { _id: new ObjectId(id) },
  //             { $set: { title: title, year: year } }
  //         );

  //     return result;
  // } catch (e) {
  //     console.log(e);
  // } finally {
  //     await client.close();
  // }
  // }
}

module.exports = MovieService;
