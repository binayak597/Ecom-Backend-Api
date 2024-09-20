import mongoose from 'mongoose';
import { CategoryModel } from '../features/products/category.schema.js';


export const connectToDBUsingMongoose = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB is connected using mongoose");
        await addCategories();
    }catch(err){
        console.log("Errror during the connection to DB");
        console.log(err);
    }
}

const addCategories = async () => {

    const categories = await CategoryModel.find({});
    if(!categories || categories.length == 0){
        await CategoryModel.insertMany([
            {name: "Books"},
            {name:"Electronics"},
            {name: "Clothing"}
        ]);
        console.log("Categories have added");
    }
}