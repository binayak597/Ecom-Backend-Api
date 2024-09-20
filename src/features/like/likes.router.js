import { Router } from "express";
import LikeController from "./likes.controllers.js";

const likeRouter = Router();

//create an instance of an LikeController class
const likeController = new LikeController();

//routes related to likeController
//localhost:3200/api/likes/
likeRouter.post("/", (req, res) => {
    likeController.addLike(req, res);
});

likeRouter.get("/", (req, res) => {
    likeController.getLikeInfo(req, res);
});

export default likeRouter;