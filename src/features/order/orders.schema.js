import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId,
             ref: "User"},
    totalAmount: {type: Number},
    timeStamp: {type: Date}
})