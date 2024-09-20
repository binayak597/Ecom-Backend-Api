import mongoose from "mongoose";

export const cartItemSchema = new mongoose.Schema({

    //in this schema we need to pass two fields and they are expecting an ObjectId which is refers to the document of another collection
    //mongoose allows us to define such thing in this following way


    //whenever you will pass the collection name using any feature of mongoose, always pass the collection name with Singluar form and first letter should be Uppercase letter it will automatically convert to plural form with all lowercase characters
    //this is the naming convention rule of mongoose interms of collection name
    
    productID: {type: mongoose.Schema.Types.ObjectId,
                ref: "Product"},
    userID: {type: mongoose.Schema.Types.ObjectId,
                ref: "User"},
    quantity: {type: Number}

});