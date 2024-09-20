import { Router } from "express";
import ProductController from "./products.controller.js";
import { upload } from "../../middlewares/file-upload.middleware.js";

const productRouter = Router();

//create an instance of productcontroller class
const productController = new ProductController();

//routes related to ProductController

// productRouter.get("/", productController.getAllProducts);
productRouter.get("/", (req, res) => {
    productController.getAllProducts(req, res);
});
//localhost:3200/api/products/filter?minPrice=10&maxPrice=20&category=category2

// productRouter.get("/filter", productController.filterProduct);
productRouter.get("/filter", (req, res) => {
    productController.filterProduct(req, res);
});


productRouter.get("/averagePrice", (req, res) => {
    productController.averageProductPricePerCategory(req, res);
});

// productRouter.get("/:id", productController.getOneProduct);
productRouter.get("/:id", (req, res) => {
    productController.getOneProduct(req, res);
});
// productRouter.post("/", upload.single("imageUrl"),productController.addProduct);
productRouter.post("/", upload.single("imageUrl"),(req, res) => {
    productController.addProduct(req, res);
});
// productRouter.post("/rate", productController.rateProduct);
productRouter.post("/rate", (req, res) => {
    productController.rateProduct(req, res);
});

export default productRouter;