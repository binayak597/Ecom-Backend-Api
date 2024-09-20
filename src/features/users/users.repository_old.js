import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class UserRepository{

  constructor(){
    this.collection = "users";
  }

    signUp = async (newUser) => {

        try{
          //get the database
          const db = getDB();
 
          //get the collection
          const collection = db.collection(this.collection);
          
          //insert new document
          await collection.insertOne(newUser);
          return newUser;
        }catch(err) {
 
             //if in your application there will be any asynchronous operation might throw an error, that error might be or might not be bypassed by application level error handler middleware
             throw new ApplicationError("Something went wrong", 500);
        }
 
     }

    //  signIn = async (email, password) => {

    //     try{
    //         //get the database
    //       const db = getDB();
 
    //       //get the collection
    //       const collection = db.collection(this.collection);
    //      //find the document
    //       const userFound = await collection.findOne({email, password});
    //       return userFound;
    //     }catch(err) {
    //         throw new ApplicationError("Something went wrong", 500);
    //     }
    //     // const user = users.find(u => u.email == email && u.password == password);

    //     // return user;
    // }

    findByEmail = async (email) => {
      try{
        //get the database
      const db = getDB();

      //get the collection
      const collection = db.collection(this.collection);
     //find the document
      const userFound = await collection.findOne({email});
      return userFound;
    }catch(err) {
        throw new ApplicationError("Something went wrong", 500);
    }
    }
}

export default UserRepository;