import { Router } from "express";
import UserController from "./users.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

const userRouter = Router();

//create an instance of an usercontroller class
const userController = new UserController();


//routes related to usercontroller
// userRouter.post("/signUp", userController.getSignUp);
userRouter.post("/signUp", (req, res) => {
    userController.getSignUp(req, res);
});
// userRouter.post("/signIn", userController.getSignIn);
userRouter.post("/signIn", (req, res) => {
    userController.getSignIn(req, res);
});

userRouter.post("/resetPassword", jwtAuth, (req, res) => {
    userController.resetPassword(req, res);
});
export default userRouter;