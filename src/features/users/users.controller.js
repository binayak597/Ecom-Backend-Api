import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from "./users.model.js";
import UserRepository from "./users.repository.js";
const saltRounds = 10;

export default class UserController{

    constructor(){
        this.userRepository = new UserRepository();
    }

     getSignUp = async (req, res, next) => {

        try{
            const {email, name, password, type} = req.body;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            // const newUser = await UserModel.signUp(email, name, password, type);
            const newUser = new UserModel(email, name, hashedPassword, type);

            await this.userRepository.signUp(newUser);

            res.status(201).send(newUser);
        }catch(err) {
            // next(err);
            //if in your application there will be any asynchronous operation might throw an error, that error might be or might not be bypassed by application level error handler middleware
            res.status(err.statusCode).send(err.message);
        }
    }

    getSignIn = async (req, res) => {
        try{
            const {email, password} = req.body;

        // const isUser = UserModel.signIn(email, password);

        // const isUser = await this.userRepository.signIn(email, password);

        const isUser = await this.userRepository.findByEmail(email);
        if(!isUser){
            res.status(404).send({message: "Incorrect Credientials"});
        }else{
            const isPassword = await bcrypt.compare(password, isUser.password);

            if(isPassword){
                //create a jwt token
            const token = jwt.sign({userId: isUser._id, email: isUser.email}, process.env.SECRET_KEY, {
                expiresIn: "1h"
            });
            // res.status(200).send({message: "Login Successfull"});
            res.status(200).send(token);
            }else{
                res.status(404).send({message: "Incorrect Credientials"});
            } 
        }
        }catch(err){
            res.status(err.statusCode).send(err.message);
        }
    }


    resetPassword = async (req, res) => {

        try{
            const {newPassword} = req.body;
            const userID = req.userID;
            
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
            await this.userRepository.resetPassword(userID, hashedPassword);
            res.status(200).send("Password is updated");
        }catch(err){
            res.status(err.statusCode).send(err.message);
        }


    }


}