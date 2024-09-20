import { Router } from "express";
import OrderController from "./orders.controllers.js";

const orderRouter = Router();


const orderController = new OrderController();

//routes related to orderController

orderRouter.get("/", (req, res) => {
    orderController.placeOrder(req, res);
});

export default orderRouter;