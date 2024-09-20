import ProductModel from "./products.model.js"
import ProductRepository from "./products.repository.js";

export default class ProductController{
    constructor(){
        this.productRepository = new ProductRepository();
    }

     getAllProducts = async (req, res) => {
       try {
        const products = await this.productRepository.getAll();
        res.status(200).send(products);
       } catch (err) {
            res.send(err.statusCode).send(err.message);
       }

    // const products = ProductModel.getAll();
    // res.status(200).send(products);
    }

    addProduct = async (req, res) => {

        try {
            // const {name, desc, price, sizes} = req.body;
            const {name, desc, categories, price, sizes} = req.body;
            const imageUrl = req?.file?.filename;


        const newProduct = new ProductModel(name, desc, imageUrl, categories, parseFloat(price), sizes?.split(","));
        
        await this.productRepository.add(newProduct);
        res.status(201).send(newProduct);
        } catch (err) {
            console.log(err);
            res.status(err.statusCode).send(err.message);
        }

        // const {name, desc, price, sizes} = req.body;
        
        // // const imageUrl = req.file.filename;
        // const productCreated = ProductModel.add(name, desc, price, sizes);
        // res.status(201).send(productCreated);
    }

    getOneProduct = async (req, res) => {


        try {
            const {id} = req.params;
        const productFound = await this.productRepository.getOne(id);

        if(!productFound) res.status(404).send({message: "Product not Found"});
        else res.status(200).send(productFound);
        } catch (err) {
            res.status(err.statusCode).send(err.message);
        }

        // const {id} = req.params;
        // const productFound = ProductModel.getOne(id);

        // if(!productFound) res.status(404).send({message: "Product not Found"});
        // else res.status(200).send(productFound);
    }

    updateProduct = (req, res) => {

    }

    filterProduct = async (req, res) => {

        try {
            // const {minPrice, maxPrice, category} = req.query;
            const {minPrice, categories} = req.query;
            // const products = await this.productRepository.filter(minPrice, maxPrice, category);
            const products = await this.productRepository.filter(minPrice,categories);
    
            res.status(200).send(products); 
        } catch (err) {
            res.status(err.statusCode).send(err.message);
        }

        // const {minPrice, maxPrice, category} = req.query;
        // const products = ProductModel.filter(minPrice, maxPrice, category);

        // res.status(200).send(products);
    }

    deleteProduct = (req, res) => {

    }

    // rateProduct = (req, res, next) => {
    //     // // const {userID, productID, rating} = req.query;
    //     // const {productID, rating} = req.querys;
    //     // const userID = req.userID;
    //     // // const error = ProductModel.rate(userID, productID, rating);
    //     // // if(error) res.status(404).send({error});
    //     // // else res.status(200).send({message: "Rating has been added successfully"});
    //     // // try{
    //     // //     const error = ProductModel.rate(userID, productID, rating);  
    //     // // }catch(err){
    //     // //     res.status(404).send(err.message);
    //     // // }

    //     // const error = ProductModel.rate(userID, productID, rating); 
        
    //     // res.status(200).send({message: "Rating has been added successfully"});




    //     //what if suppose the entire controller method will throw an error
    //     //how to handle such error by error handler middleware that sit on server.js file


    //     try{
    //         // const {userID, productID, rating} = req.query;
    //         const{productID, rating} = req.query;
    //     // const {productID, rating} = req.querys;
    //     const userID = req.userID;
    //     // const error = ProductModel.rate(userID, productID, rating);
    //     // if(error) res.status(404).send({error});
    //     // else res.status(200).send({message: "Rating has been added successfully"});
    //     // try{
    //     //     const error = ProductModel.rate(userID, productID, rating);  
    //     // }catch(err){
    //     //     res.status(404).send(err.message);
    //     // }

    //     const error = ProductModel.rate(userID, productID, rating); 
        
    //     res.status(200).send({message: "Rating has been added successfully"});
    //     }catch(err){
    //         console.log("passing error to error handler middleware");
    //         next(err);
    //     }
    // }

    rateProduct = async (req, res) => {

        try {
            // const {productID, rating} = req.query;
            const {productID, rating} = req.body;
            console.log(productID);
        const userID = req.userID;

        await this.productRepository.rate(userID, productID, rating);
        res.status(200).send({message: "Rating has been added successfully"});
        } catch (err) {
            res.status(err.statusCode).send(err.message);
        }
    }

    averageProductPricePerCategory = async (req, res) => {

        try{
            const result = await this.productRepository.averagePrice();
            res.status(200).send(result);
        }catch(err){
            res.status(err.statusCode).send(err.message);
        }

    }
}