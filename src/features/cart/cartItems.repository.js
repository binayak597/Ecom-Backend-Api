import {ObjectId} from 'mongodb';
import { getDB } from "../../config/mongodb.js"
import { ApplicationError } from "../../error-handler/applicationError.js";


export default class CartItemRepository{
    constructor(){
        this.collection = "cartItems";
    }
    add = async (userID, productID, quantity) => {

        try {
            //get the database
        const db = getDB();

        //get the collection
        const collection = db.collection(this.collection);
        
        const id = await this.getIdByCounter(db);
        console.log(id);
        //update the quantity

        //check if cartItem document exist
        //if exist update the quantity
        //if not create the document and insert it
        
        //how can we perform these two tasks from one method....
        //using upsert option in update method
        //you can use upsert parameter in update methods that provided by MONGODB and you can only use this parameter in update methods

        await collection.updateOne({userID: new ObjectId(userID), productID: new ObjectId(productID)}, {
            $setOnInsert: {_id: id},
            // $set: {quantity}
            $inc: {
                quantity
            }
        }, {
            upsert: true
        });


        //insert the cartItem document
        // await collection.insertOne({userID: new ObjectId(userID), productID: new ObjectId(productID), quantity});
        } catch (err) {
            throw new ApplicationError("Something went wrong", 500);
        }

    }

    get = async (userID) => {

        try {
            //get the database
        const db = getDB();

        //get the collection
        const collection = db.collection(this.collection);

        //find all document
        const cartItems = await collection.find({userID: new ObjectId(userID)}).toArray();
        return cartItems;

        } catch (err) {
            throw new ApplicationError("Something went wrong", 500);
        }

    }

    delete = async (userID, cartItemID) => {

        try{
            //get the database
        const db = getDB();

        //get the collection
        const collection = db.collection(this.collection);

        //delete the document

        const deletedData = await collection.deleteOne({_id: new ObjectId(cartItemID), userID: new ObjectId(userID)});

        //return deletedData.deletedCount > 0;
        //if deletedCount value will be greater than 0 that means deletion happened if its value 0 then no deletion happened
        }catch(err){
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    getIdByCounter = async (db) => {

        const updatedDocument = await db.collection("counters").findOneAndUpdate({
            _id: "cartItemId"
        }, {
         $inc: {
            value: 1
         }
        }, {
            //by default any update method in mongodb provides the original document before updation
            //if you want the updated document then in optional parameter you can pass returnDocument or returnNewDocument 
            //for more details read mongodb docs

            returnDocument: "after"
         }   
        );

        // console.log(updatedDocument);
        // console.log(updatedDocument.value);
        return updatedDocument.value;

    }
}