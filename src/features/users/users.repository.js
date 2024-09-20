import mongoose from "mongoose";
import { userSchema } from "./users.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


const UserModel = mongoose.model("User", userSchema);

export default class UserRepository{

    signUp = async (user) => {

        try {
            const newUser = new UserModel(user);
        await newUser.save();
        return newUser;
        } catch (err) {
            if(err instanceof mongoose.Error.ValidationError){
                // throw err;
                throw new ApplicationError(err.message, 400);
            }
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    findByEmail = async (email) => {

        try {
            const userFound = await UserModel.findOne({email});
            return userFound;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }

    }

    resetPassword = async (userID, hashedPassword) => {

        try {
            const user = await UserModel.findById(userID);
            if(user){
                user.password = hashedPassword;
                await user.save();
            }else{
                throw new Error("User not found");
            }
        } catch (err) {
            if(err instanceof Error){
                throw new ApplicationError(err.message, 404);
            }
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }

    }
}