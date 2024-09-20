import { Router } from "express";
import CartItemController from "./cartItems.controllers.js";

const cartRouter = Router();

//create an instance of an cartItemController class
const cartItemController = new CartItemController();

//routes related to cartItemController
// cartRouter.get("/", cartItemController.getCartItems);
cartRouter.get("/", (req, res) => {
    cartItemController.getCartItems(req, res);
});
// cartRouter.post("/", cartItemController.addCartItem);
cartRouter.post("/", (req, res) => {
    cartItemController.addCartItem(req, res);
});

// cartRouter.delete("/:id", cartItemController.deleteCartItem);
cartRouter.delete("/:id", (req, res) => {
    cartItemController.deleteCartItem(req, res);
});

export default cartRouter;