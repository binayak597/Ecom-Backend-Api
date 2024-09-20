import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    //if you have multiple references for a particular field
    //and you dont know which type of reference you will store for each docu
    //then you can speifiy your schema in this way and work accordingly
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "types", //you can pass any name to the value of refPath field
        //and that value you will use to define the type of data of the collection and what are the prespecified collections you have

    },
    types: {
        type: String,
        enum: ["Product", "Category"]
    }
}).pre('save', (next) => {
    console.log("Like is coming");
    next();
}).post('save', (docs) => {
    console.log("like is added");
    console.log(docs);
}).pre('find', (next) => {
    console.log("like is retrieving");
    next();
}).post('find', (docs) => {
    console.log(docs);
})

export const LikeModel = mongoose.model("Like", likeSchema);