import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


export default class UserModel{

    constructor(email, name, password, type, id){
        this.email = email;
        this.name = name;
        this.password = password;
        this.type = type;
        this._id = id;
    }

    // static async signUp(email, name, password, type){

    //    try{
    //      //get the database
    //      const db = getDB();

    //      //get the collection
    //      const collection = db.collection("users");
 
    //      const newUser = new UserModel(email, name, password, type);
    //      await collection.insertOne(newUser);
    //      return newUser;
    //    }catch(err) {

    //         //if in your application there will be any asynchronous operation might throw an error, that error might be or might not be bypassed by application level error handler middleware
    //         throw new ApplicationError("Something went wrong", 500);
    //    }


    //     // const newUser = new UserModel(users.length + 1, email, name, password, type);

    //     // users.push(newUser);

    //     // return newUser;
    // }

    // static signIn(email, password){

    //     const user = users.find(u => u.email == email && u.password == password);

    //     return user;
    // }

    static getAll(){
        return users;
    }


}

let users = [
    {
        id: 1,
        email: "admin@user.com",
        name: "binayak",
        password: "password1",
        type: "seller"
    },
    {
        id: 2,
        email: "seller@user.com",
        name: "dev",
        password: "password2",
        type: "customer"
    },
    {
        id: 3,
        email: "seller@user2.com",
        name: "devil",
        password: "password3",
        type: "customer"
    }
]