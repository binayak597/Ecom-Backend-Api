import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import OrderModel from "./orders.models.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


export default class OrderRepository{

    constructor(){
        this.collection = "orders";
    }

    placeOrder = async (userID) => {

        const client = getClient();

        //using clientInstance we need to start the session
        const session = client.startSession();

        try {
            
            const db = getDB();


            //transaction -> it is a collection of database operations that must be performed in such a way either all of them will execute or none of them will execute
            //its like an atomic operation
            //with the help of transaction we can wrap mulitple database operations of mulitple collection into single operation so that if any one operation will be fail then the database state will be revert back to its original state that it was before the transaction was started by reverting all the opertions that already performed

            //transaction feature that provides by mongodb is only applicable if you are using mongodb in replica sets

            //mongodb is made for big and scalable applications so you can create as many replica as you want like distribute databases of you main database that contain same copies of data so that it will help you for balancing the load and allows more number of requests

            //so right now we are using mongodb as standalone instance 
            //so we have to convert this one to replica set to use tansaction feature

            //mongod --dbpath=mongodb-data -> this command is for create a standalone instance
            //and this [mongodb-data] -> [directory name] is a directory where all of our databse files are stored locally
            //but we need to create a replica set of mongodb
            //so for that mongod --replSet rs0 --dbpath=mongodb-data
            //this rs0 -> refers to name of the replica instance 
            //you can give any name you want
            //this command is basically for create one replica set and the name of the replica set we specified here is rs0

            //if you will get any error by using this command that means you need to first shutdown your standalone instance by db.shutDown() and then use this command again



            //using session we need start the transaction
            session.startTransaction();
        //get all cartItems and calculate the total amount

        const items = await this.calculateTotalAmount(userID, session);

            //calculate the total final amount  by performing the sum opertion of each document by taking the totalamount field value
        const totalFinalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0);
        console.log(totalFinalAmount);

        //create an order document

        const newOrder = new OrderModel(new ObjectId(userID), totalFinalAmount, new Date());

        await db.collection(this.collection).insertOne(newOrder, {session});

        //reduce the stock 

        for(let item of items){
            await db.collection("products").updateMany({
                _id: new ObjectId(item.productID)
            },
            {
                $inc: {stock: -item.quantity}
            },
            {
                session
            }
            );
        }

        // throw new Error("Something went wrong");

        //clear the cartItems

        await db.collection("cartItems").deleteMany({
            userID: new ObjectId(userID)
        }, {
            session
        });

        session.commitTransaction(); //commit the currently active transaction in the session
        //this commitTransaction() represents that all the operations of that transaction have been completed and database is updated
        session.endSession(); //ends the session on the mongodb server
        return;
        } catch (err) {
            //if any one operation will throw the error then that error will be catch by catch block but we are never ending the session or abort the transaction so it will lead to writeconflict error -> the operation conflicts with another operation

            session.abortTransaction(); //aborts the current active transaction in the session
            
            session.endSession(); //ends the session on the mongodb server

            //in this way we can manage the session and start the fresh session again when we want to perform that operation that is placeorder operation otherwise it will lead to memeory leakage or write conflict error


            throw new ApplicationError("Something went Wrong", 500);
        }
    }

    calculateTotalAmount = async (userID) => {

        const db = getDB();

        const items = await db.collection("cartItems").aggregate([

            //filter all cartItems based on the userID
            {
                $match: {userID: new ObjectId(userID)}
            }, 

            //how every cartItem document looks like

            // {
            //     _id: ObjectId("66150174e37a5f4cd300f94c"),
            //     userID: ObjectId("6610f809cf699a9d2032a21c"),
            //     productID: ObjectId("66115dd4e6eff367824a1e20"),
            //     quantity: 3
            // }

           //to relate two collections to retreive each product document
           {
            $lookup: {
                from: "products", //foreign collection, to which collection we want to join
                localField: "productID", //the field value of the local collection that matches with
                foreignField: "_id", //the field value of the foreign collection
                as: "productInfo" //after pull the document from foreign collection we need to store that data  interms of value, so add one field to local document collection
            }
           },

           //this is how now every cartItem document will look like
           
           
        //    {
        //     _id: ObjectId("66150174e37a5f4cd300f94c"),
        //     userID: ObjectId("6610f809cf699a9d2032a21c"),
        //     productID: ObjectId("66115dd4e6eff367824a1e20"),
        //     quantity: 3,
        //     productInfo: [
        //       {
        //         _id: ObjectId("66115dd4e6eff367824a1e20"),
        //         name: 'Product 4',
        //         desc: 'Description for Product 4',
        //         imageUrl: 'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
        //         category: 'category2',
        //         price: 10000,
        //         sizes: [ 'M', 'XL', 'XS', 'XXL', 'S' ]
        //       }
        //     ]
        //   }


        //deconstruct the productInfo nested array from each document and return the output document

        {
            $unwind: "$productInfo"
        }, 

        //this is how now every cartItem document will look like

         //    {
        //     _id: ObjectId("66150174e37a5f4cd300f94c"),
        //     userID: ObjectId("6610f809cf699a9d2032a21c"),
        //     productID: ObjectId("66115dd4e6eff367824a1e20"),
        //     quantity: 3,
        //     productInfo: 
        //       {
        //         _id: ObjectId("66115dd4e6eff367824a1e20"),
        //         name: 'Product 4',
        //         desc: 'Description for Product 4',
        //         imageUrl: 'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
        //         category: 'category2',
        //         price: 10000,
        //         sizes: [ 'M', 'XL', 'XS', 'XXL', 'S' ]
        //       }
        //   }

        //for each cartItem document calculate the total amount based on the price field from the product document and the quantity field from the cartItem document by adding a new field to every cartItem document and we can add a new field into the document inside aggregation pipeline using $addFields operator

        {
            $addFields: {
                "totalAmount": {
                    $multiply: ["$productInfo.price", "$quantity"]   
                }
            }
        },

        //this is how cartItem document will look like

        // {
        //     _id: ObjectId("6615013fe37a5f4cd300f94a"),
        //     userID: ObjectId("6610f809cf699a9d2032a21c"),
        //     productID: ObjectId("661154db65e97838814cb92f"),
        //     quantity: 2,
        //     productInfo: {
        //       _id: ObjectId("661154db65e97838814cb92f"),
        //       name: 'Product 1',
        //       desc: 'Description for Product 1',
        //       imageUrl: 'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
        //       category: 'category1',
        //       price: 50000,
        //       sizes: [ 'M', 'XL', 'XS' ],
        //       ratings: [ { userID: ObjectId("6610f809cf699a9d2032a21c"), rating: 4.2 } ]
        //     },
        //     totalAmount: 100000
        //   }

        {
            session
        }
        
        ]).toArray();

        return items;
    }
}