import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "../users/users.model.js";

export default class ProductModel{

    constructor(name, desc, imageUrl, categories, price, sizes, stock, id){
        this.name = name;
        this.desc = desc;
        this.imageUrl = imageUrl;
        this.categories = categories;
        this.price = price;
        this.sizes = sizes;
        this.stock = stock;
        this._id = id;
    }

    // static getAll(){
    //     return products;
    // }

    // static add(name, desc, price, sizes){

    //     const newProduct = {
    //         id : products.length + 1,
    //         name,
    //         desc,
    //         price: parseFloat(price),
    //         sizes: sizes.split(","),
    //     }

    //     products.push(newProduct);
    //     return newProduct;

    // }

    // static getOne(id){

    //     const product = products.find(p => p.id == id);
    //     return product;
    // }

    // static filter(minPrice, maxPrice, category){

    //     const result = products.filter(p => {

    //         return (!minPrice || p.price >= minPrice) && (!maxPrice || p.price <= maxPrice) && (!category || p.category == category);
    //     });

    //     return result;
    // }

//     static rate (userID, productID, rating) {
//         //validate the user
//         const userFound = UserModel.getAll().find(user => user.id == userID);
//         // if(!userFound) return "User Not Found";

//         //user defined error
//         // if(!userFound) throw new Error("User Not Found.");
//         if(!userFound) throw new ApplicationError("User Not Found", 404);

//         //validata the product
//         const productFound = products.find(product => product.id == productID);
//         // if(!productFound) return "Product Not Found";

//         //user defined error
//         // if(!productFound) throw new Error("Product Not Found.");
//         if(!productFound) throw new ApplicationError("Product Not Found", 404);

//         //check if there are any rating , if not add ratings array into product obj

//         if(!productFound.ratings){
//             productFound.ratings = [];
//             productFound.ratings.push({
//                 userID,
//                 rating
//             });
//         }else{
//             //check if user rating is already avialable
//             const existingRatingIndex = productFound.ratings.findIndex(r => r.userID == userID);
//             if(existingRatingIndex >= 0){
//                 productFound.ratings[existingRatingIndex] = {userID, rating};
//             }else{
//                 productFound.ratings.push({
//                     userID,
//                     rating
//                 });  
//             }
//         }

//     }
 }

let products = [
    new ProductModel(
        1,
        'Product 1',
        'Description for Product 1',
        'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
        'category1',
        19.99,
      ),
      new ProductModel(
        2,
        'Product 2',
        'Description for Product 2',
        'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
        'category2',
        29.99,
        ['M', 'XL', 'S']
      ),
      new ProductModel(
        3,
        'Product 3',
        'Description for Product 3',
        'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
        'category3',
        39.99,
        ['M', 'XL']
      ),
]