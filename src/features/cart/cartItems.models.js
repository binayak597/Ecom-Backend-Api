import UserModel from "../users/users.model.js";
import ProductModel from "../products/products.model.js";

export default class CartItemModel {
    constructor(userID, productID, quantity, id){
        
        this.userID = userID;
        this.productID = productID;
        this.quantity = quantity;
        this._id = id;
    }

    // static add(userID, productID, quantity){

    //     //validate the user
    //     const userFound = UserModel.getAll().find(u => u.id == userID);
    //     if(!userFound) return "User is Not Found";

    //     //validate the product
    //     const productFound = ProductModel.getAll().find(p => p.id == productID);
    //     if(!productFound) return "Product is Not Found";

    //     //check if user wants to add the same cart Item again
    //     //check if user wants to update the quantity of the cart item
    //     const existingCardItemIndex = cartItems.findIndex(item => item.userID == userID && item.productID == productID);


    //     const cartItem = cartItems.find(item => item.userID == userID && item.productID == productID);

    //     if(existingCardItemIndex >= 0){
    //         cartItems[existingCardItemIndex] = {...cartItem, quantity};
    //     }else{
    //         const newCartItem = new CartItemModel(
    //             cartItems.length + 1,
    //             userID,
    //             productID,
    //             quantity
    //         );
    
    //         cartItems.push(newCartItem);
    //     }

    // }

    // static get(userID) {
    //     return cartItems.filter(item => item.userID == userID);

    // }

    // static delete(userID, cartItemID){

    //     const existingCardItemIndex = cartItems.findIndex(item => item.userID == userID && item.id == cartItemID);

    //     if(existingCardItemIndex == -1) return "Cart Item Not Found";
    //     else cartItems.splice(existingCardItemIndex, 1);
    // }


}

let cartItems = [];

// new CartItemModel(
//     1, //id
//     2, //userID
//     1, //productID
//     4 //quantity
// ),
// new CartItemModel(
//     2, //id
//     3, //userID
//     2, //productID
//     5 //quantity
// )
