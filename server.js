// import './env.js';
import dotenv from 'dotenv';
//to load all the env variables in your application
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productRouter from './src/features/products/products.routes.js';
import userRouter from './src/features/users/users.routes.js';
import cartRouter from './src/features/cart/cartItems.routes.js';
import basicAuthentication from './src/middlewares/basicAuthentication.middleware.js';
import jwtAuth from './src/middlewares/jwtAuth.middleware.js';
import { loggerMiddleWare } from './src/middlewares/loggerMiddleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import {connectToDB} from './src/config/mongodb.js';
import orderRouter from './src/features/order/orders.routes.js';
import { connectToDBUsingMongoose } from './src/config/mongooseConfig.js';
import likeRouter from './src/features/like/likes.router.js';

const app = express();

//configuration CORS policy

// let corsOptions = {
//     origin: 'http://localhost:5500'
// }



app.use(cors());

// app.use((req, res, next) => {
//     // res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
//     res.header('Access-Control-Allow-Origin', '*');
//     // res.header('Access-Control-Allow-Headers', 'Content-type', 'Authorization')
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Methods', '*');

//     //return ok response for preflight request
//     if(req.method == 'OPTIONS'){
//         return res.sendStatus(200);
//     }
//     next();

// });

app.use(express.json());

app.use(loggerMiddleWare);

//api getway

//all the requests related to product routes
//localhost:3200/api/products
// app.use("/api/products", basicAuthentication, productRouter);

app.use("/api/products", jwtAuth, productRouter);
//all the requests related to user routes
//localhost:3200/api/user

app.use("/api/user", userRouter);

//all the request related to cartItem routes
//localhost:3200/api/cartItem
app.use("/api/cartItems", jwtAuth, cartRouter);

//all the request related to order routes
//localhost:3200/api/orders
app.use("/api/orders", jwtAuth, orderRouter);

//all the request related to like routes
app.use("/api/likes", jwtAuth, likeRouter);

//default request handler
app.get("/", (req, res) => {
    res.send("welcome to express server");
});

//we are executing error handling middleware in application level

app.use((err, req, res, next) => {

    console.log(err);

    // if(err instanceof mongoose.Error.ValidationError){
    //     res.status(400).send(err.message);
    // }

    //user defined error
    if(err instanceof ApplicationError) {


        //if you want to log all the errors that might be thrown by the application wheather its an customised error or internal system error to log those errors in seperate file by using winston library here is the code ->


        // const error_to_log = `TimeStamp: ${new Date().toString()} req URL: ${
        //     req.originalUrl
        //   } error msg: ${err.message}`;
        //   logger.error(error_to_log);
        //   res.status(err.statusCode).send(err.message);
        // } else { //this else part belongs to internal system error to log inside errorlog file

        //   const error_to_log = `TimeStamp: ${new Date().toString()} req URL: ${
        //     req.originalUrl
        //   } error msg: oops! something went wrong...Try again later!`;
        //   logger.error(error_to_log);
        //   res.status(500).send("oops! something went wrong...Try again later!");
        res.status(err.statusCode).send({message: err.message});
    }
    
    //internal server error
    res.status(500).send({message: "something went wrong, please try again later"});
});
//handling 404 requests
app.use((req, res) => res.send({message: "API not found, check our documentation for more information at localhost:3200/api-docs"}));

app.listen(3200, async () => {
    //check for server running
    console.log("server is running on port 3200");

    //check for db connection using mongoose
    await connectToDBUsingMongoose();
    //check for DB connection using mongodb
    // connectToDB();
    
});