import UserModel from "../features/users/users.model.js";

const basicAuthentication = (req, res, next) => {

    //check if authorization header is empty or not
    const authHeader = req.headers["authorization"];

    if(!authHeader) res.status(401).send({message: "No authorization details found"});
    else{

        //extract the credentials that encoded in base64 format
        console.log(authHeader); // [Basic qwerty3409fv40t4v]
        const base64Credentials = authHeader.replace("Basic " , "");
        console.log(base64Credentials);

        //decode the credentials
        const decodedCred = Buffer.from(base64Credentials, "base64").toString("utf8"); // [username:password]

        console.log(decodedCred);
        const creds = decodedCred.split(":");
        const [username, password] = creds;

        const user = UserModel.getAll().find(u => u.name == username && u.password == password);

        if(user) next();
        else res.status(401).send({message: "Incorrect Credentials"});
    }
}

export default basicAuthentication;