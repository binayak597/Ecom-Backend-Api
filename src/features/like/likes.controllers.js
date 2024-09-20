
import LikeRepository from "./likes.repository.js";


export default class LikeController{

    constructor(){

        this.likeRepository = new LikeRepository();
    }

    getLikeInfo = async (req, res) => {

        try {
            const  {id, type} = req.query;

            const result = await this.likeRepository.getLikeInfo(id, type);

            res.status(200).send(result);
        } catch (err) {
            console.log(err);
            res.status(err.statusCode).send(err.message);
        }
    }

    addLike = async (req, res) => {

        try {
            const {id, type} = req.body;
            const userID = req.userID;

        if(type != "Product" && type != "Category"){
            res.status(400).send("Invalid Type");
        }

        if(type == "Product"){

            await this.likeRepository.likeProduct(id, userID);
        }

        if(type == "Category"){

            await this.likeRepository.likeCategory(id, userID);
        }

        res.status(201).send();
        } catch (err) {
            console.log(err);
            res.status(err.statusCode).send(err.message);
        }
    }
}