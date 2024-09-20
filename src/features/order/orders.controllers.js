import OrderRepository from "./orders.repository.js";


export default class OrderController{

    constructor(){
        this.orderRepository = new OrderRepository();
    }

    placeOrder = async (req, res) => {
        try {
            const userID = req.userID;
            await this.orderRepository.placeOrder(userID);
            res.send(200).send("Order is created");
        } catch (err) {
            res.status(err.statusCode).send(err.message);
        }
    }
}