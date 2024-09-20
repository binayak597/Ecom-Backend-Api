import {ObjectId} from 'mongodb';
import { getDB } from "../../config/mongodb.js"
import { ProductModel } from './products.schema.js';
import { ReviewModel } from './reviews.shcema.js';
import { CategoryModel } from './category.schema.js';

import { ApplicationError } from "../../error-handler/applicationError.js";

class ProductRepository{
    constructor(){

        this.collection = "products";
    }
    getAll = async () => {
        try {
            //get the database
        const db = getDB();

        //get the collection
        // const collection = db.collection("products");
        const collection = db.collection(this.collection);

        //retrieve all the products
        const products = await collection.find().toArray();
        return products;
            
        } catch (err) {
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    // add = async (newProduct) => {

    //     try {
    //         //get the database
    //     const db = getDB();

    //     //get the collection
    //     // const collection = db.collection("products");
    //     const collection = db.collection(this.collection);

    //     //insert a new product document
    //     await collection.insertOne(newProduct);
    //     return newProduct;
            
    //     } catch (err) {
    //         throw new ApplicationError("Something went wrong", 500);
    //     }
    // }

    add = async (productData) => {
        try {
        productData.categories = productData.categories.split(",").map(e => e.trim());

        console.log(productData);

        const newProduct = new ProductModel(productData);

        const savedProduct = await newProduct.save();
        console.log(savedProduct);

        await CategoryModel.updateMany({
            _id: {
                $in: productData.categories
            }},
            {
                $push: {
                    products: new ObjectId(savedProduct._id)
                }
            });

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }


    }

    getOne = async (id) => {
        try {
            //get the database
        const db = getDB();

        //get the collection
        // const collection = db.collection("products");
        const collection = db.collection(this.collection);

        //retrieve the product based on id
        return await collection.findOne({_id : new ObjectId(id)});
        
            
        } catch (err) {
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    //product should have price and category field
    // filter = async (minPrice, category) => {
    filter = async (minPrice, categories) => {

        try{
            //get the database
        const db = getDB();

        //get the collection
        // const collection = db.collection("products");
        const collection = db.collection(this.collection);
        
        // console.log(categories);
        // "[ 'category2', 'category3', 'category4', 'category5' ]"
        // categories = JSON.parse(categories);
        // console.log(categories);
        //[ 'category2', 'category3', 'category4', 'category5' ]


        let filterExpression = {};

        if(minPrice){
            filterExpression.price = {$gte: parseFloat(minPrice)};
        }
        // if(maxPrice){
        //     filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)};
        // }
        // if(category){
        console.log(filterExpression);
        categories = JSON.parse(categories.replace(/'/g, '"'));
        console.log(categories);
        if(categories){

            // filterExpression.category = category;

            //using $and operator
            // filterExpression = {$and: {category: category, filterExpression}};

            //using $or operator
            // filterExpression = {$or: {category: category, filterExpression}};

            //using or operator and in operator
            filterExpression = {
                $or: [{
                    category: {
                        //["category2", "category3", "category4", "category5"]
                        $in: categories
                    }},
                    filterExpression
                ]
            }
        }

        console.log(filterExpression);

        const filteredProducts = await collection.find(filterExpression).project({name: 1, price: 1, _id: 0, ratings: {$slice: -1}}).toArray();
        return filteredProducts;

        

        }catch(err){
            throw new ApplicationError("Something went wrong", 500);
        }
    }


    // rate = async (userID, productID, rating) => {
    //     try{

    //         //get the db
    //         const db = getDB();

    //         //get the collection
    //         const collection = db.collection(this.collection);

    //         //retrieve the document
    //         const product = await collection.findOne({_id: new ObjectId(productID)});

    //         // if there is existing user rating obj there inside ratings array
    //         // using null checker we are finding

    //         const userRatingObj = product?.ratings?.find(r => r.userID == userID);

    //         if(userRatingObj){
    //             await collection.updateOne({
    //                 _id: new ObjectId(productID), "ratings.userID": new ObjectId(userID)
    //             }, {
    //                 $set: {
    //                     //$  -> dollar placeholder is returning that rating obj from the ratings array
    //                     //and then that rating obj rating property we are accessing and update with the extracted rating value
    //                     "ratings.$.rating": rating
    //                 }
    //             });
    //         }else{
    //             await collection.updateOne({_id: new ObjectId(productID)}, {
    //                 $push: {ratings: {userID: new ObjectId(userID), rating}}
    //             });
    //         }



    //     }catch(err){
    //         throw new ApplicationError("Something went wrong", 500);
    //     }
    // }

    // rate = async (userID, productID, rating) => {
    //     try{

    //         //get the db
    //         const db = getDB();

    //         //get the collection
    //         const collection = db.collection(this.collection);


    //         //resolving race condition
        
    //         //fetch the document
    //         //remove or pull exisiting rating obj based on userid

    //         await collection.updateOne({
    //             _id: new ObjectId(productID)
    //         }, {
    //             $pull: {
    //                 ratings: {userID: new ObjectId(userID)}
    //             }
    //         });

    //         //adding new rating obj based on userid and rating to the ratings array
    //         await collection.updateOne({_id: new ObjectId(productID)}, {
    //             $push: {ratings: {userID: new ObjectId(userID), rating}}
    //         });


    //         //the above two codes are atomic operation
    //         //either the both will work together or none of them will execute

    //     }catch(err){
    //         throw new ApplicationError("Something went wrong", 500);
    //     }
    // }

    rate = async (userID, productID, rating) => {

        try {
            //check if the product is exist
        const productFound = await ProductModel.findById(productID);
        if(!productFound) throw new Error("Product Not Found");

        //get the existing user review

        const userReview = await ReviewModel.findOne({userID: new ObjectId(userID), productID: new ObjectId(productID)});

        if(userReview){
            userReview.rating = rating;
            await userReview.save();
        }else{
            const newReview = new ReviewModel({
                userID: new ObjectId(userID),
                productID: new ObjectId(productID),
                rating: rating
            });

            const savedReview = await newReview.save();
            await ProductModel.updateOne({_id: new ObjectId(productID)},
        {
            $push: {
                reviews: savedReview._id
            }
        });
        }
        } catch (err) {
            if(err instanceof Error){
                throw new ApplicationError(err.message, 500);
            }
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    averagePrice = async () => {

        try {
            //aggregation pipeline concept implementation
        const db = getDB();
        const collection = db.collection(this.collection);

        const result = await collection.aggregate([
            {
                //1st stage -> group stage
                $group: {
                    _id: "$category",
                    averagePrice: {$avg: "$price"}
                }
            }
        ]).toArray();

        return result;
        } catch (err) {
            throw new ApplicationError("Something went wrong", 500);
        }
    }


}

export default ProductRepository;