import CartItemModel from "./cartItems.models.js";
import CartItemRepository from "./cartItems.repository.js";

export default class CartItemController {

    constructor(){

        this.cartItemRepository = new CartItemRepository();
    }

    addCartItem = async (req, res) => {

        try {
            const {productID, quantity} = req.body;
        const userID = req.userID;

        // const newCartItem = new CartItemModel(userID, productID, quantity);
        await this.cartItemRepository.add(userID, productID, quantity);
        res.status(201).send({meesgae: "cart item has been added successfully"});
        } catch (err) {
            res.status(err.statusCode).send(err.message);
        }
        // const {productID, quantity} = req.query;
        // const userID = req.userID;
        // const error = CartItemModel.add(userID, productID, quantity);
        // if(error) res.status(404).send({error});
        // else res.status(201).send({meesgae: "cart item has been added successfully"});
        
    }

    //all the cart items that related to a specific user of this application by taking that userID

    getCartItems = async (req, res) => {

        try {
            const userID = req.userID;
        const cartItems = await this.cartItemRepository.get(userID);
        if(cartItems.length == 0) res.status(404).send({message: "No CartItems have been found"});
        else res.status(200).send(cartItems); 
        } catch (err) {
            res.status(err.statusCode).send(err.message);
        }
        // const userID = req.userID;
        // const cartItems = CartItemModel.get(userID);
        // if(cartItems.length == 0) res.status(404).send({message: "No CartItems have found"});
        // else res.status(200).send(cartItems); 
    }

    deleteCartItem = async (req, res) => {

        try {
            const userID = req.userID;
            const {id} = req.params;
            await this.cartItemRepository.delete(userID, id);
            res.status(200).send({message: "Item has been deleted successfully"}); 
        } catch (err) {
            res.status(err.statusCode).send(err.message);
        }
        // const userID = req.userID;
        // const {id} = req.params;
        // const error = CartItemModel.delete(userID, id);
        // if(error) res.status(404).send({error});
        // else res.status(200).send({message: "Item has been deleted successfully"});
    }
}