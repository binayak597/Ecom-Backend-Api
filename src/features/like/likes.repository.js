import { ObjectId } from "mongodb";
import { LikeModel } from "./likes.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class LikeRepository{

    getLikeInfo = async (id, type) => {
        try {
            const result = await LikeModel.find({
                likeable: new ObjectId(id),
                types: type
            }).populate('user').populate({
                path: 'likeable',
                model: type
            });

            console.log(result);
            return result;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    likeProduct = async (productID, userID) => {

        try {
            const newLike = new LikeModel({
                user: new ObjectId(userID),
                likeable: new ObjectId(productID),
                types: "Product"
            });
            await newLike.save();
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    likeCategory = async (categoryID, userID) => {

        try {
            const newLike = new LikeModel({
                user: new ObjectId(userID),
                likeable: new ObjectId(categoryID),
                types: "Category"
            });
            await newLike.save();
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }
}