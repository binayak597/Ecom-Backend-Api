//this reviews file is the same rating file as well

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId,
             ref: "User"},
    productID: {type: mongoose.Schema.Types.ObjectId,
                ref: "Product"},
    rating: {type: Number}
});

export const ReviewModel = mongoose.model("Review", reviewSchema);