//MongoClient is a class from mongodb module
import { MongoClient } from "mongodb";
// import dotenv from 'dotenv';
// dotenv.config();

// const url = process.env.MONGODB_URL;

let client;
export const connectToDB = () => {

    MongoClient.connect(process.env.MONGODB_URL).then(clientInstance => {
        client = clientInstance;
        console.log("DB is connected");
        // console.log("Connected to database:", clientInstance.s.url);
        createCounter(client.db());
        createIndexes(client.db());
}).catch(err => console.log(err));
    
}

export const getClient = () => {
    return client;
}

export const getDB = () => {
    return client.db();
}

export const closeMongoDBConnection = async () => {
    try {
      if (client) {
        await client.close();
        console.log("MongoDB connection closed");
      } else {
        console.warn("MongoDB client not available for closing");
      }
    } catch (err) {
      console.error("Error closing MongoDB connection:", err);
    }
  };
  

const createCounter = async (db) => {

   try {
    const existingCounterDocument = await db.collection("counters").findOne({_id: "cartItemId"});

    if(!existingCounterDocument){
        await db.collection("counters").insertOne({_id: "cartItemId", value: 0});
    }
   } catch (err) {
        console.log(err);
   }
}

const createIndexes = async (db) => {
    try{
        //single field indexex
    await db.collection("products").createIndex({price: 1});
    //compound field indexes
    await db.collection("products").createIndex({name: 1, category: -1});

    //text indexes
    await db.collection("products").createIndex({desc: "text"});

    console.log("indexes are created");
    }catch(err){
        console.log(err);
    }
}



