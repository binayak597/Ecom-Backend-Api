import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: {type: String,
         maxLength: [25, "Name should not be more than 25 Characters"],
          required: true},
    email: {type: String,
        match: [/.+\@.+\../, "Please enter a valid email"],
         unique: true,
          required: true}, 
    password: {type: String,
                //if you want you can also add your own custom validator
                validate: {
                    validator: function(value){
                        return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value)
                    },
                    message: "Password should be between 8-12 characters and have a special character"
                }
               },

    //mongoose allows us to provide that what kind of value we are expecting for a particular field
    //for a particular field you can prespecify values interms of an array
    //so if the user will pass the value and if it will match with one of the value of the specified values it will accept otherwise not

    //in almost every programming language enum datatype is there where you can prespecify values for a particular field
    type: {type: String, enums: ["Customer", "Seller"]}
});