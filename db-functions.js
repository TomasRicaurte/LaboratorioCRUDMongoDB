const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_URI;

async function ConnectMongoAtlas() {
  let client; 

  try {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await client.connect();
    console.log("¡Conexión exitosa a MongoDB!");
    const db = client.db("ListaDeTareas");
    const collection = db.collection("tareas");
  } finally {
    if (client) {
      await client.close();
    }
  }
}

async function createTarea(){
  try {
    
  } catch (error) {
    
  }
}

async function UpdateTarea(){
try {
  
} catch (error) {
  
}
}

async function deleteTarea(){
  try {
    
  } catch (error) {
    
  }
}

async function searchTareaId(){
  try {
    
  } catch (error) {
    
  }
}

module.exports = {
  ConnectMongoAtlas, 
  createTarea, 
  UpdateTarea, 
  deleteTarea, 
  searchTareaId
}