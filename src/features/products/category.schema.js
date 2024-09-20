
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    name: {type: String},
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

export const CategoryModel = mongoose.model("Category", categorySchema);