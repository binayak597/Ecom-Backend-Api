import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String},
    desc: {type: String},
    price: {type: Number},
    stock: {type: Number},
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    ],
    reviews: [
        {type: mongoose.Schema.Types.ObjectId,
         ref: "Review"}
    ]
});

export const ProductModel = mongoose.model("Product", productSchema);