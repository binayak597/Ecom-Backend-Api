import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {

    //read the token
    const token = req.headers["authorization"];

    //if token is empty
    if(!token) res.status(401).send({message: "Unauthorized"});

    //verify the token
    try{
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.userID = payload.userId;
        console.log(payload);
    }catch(err){
        res.status(401).send(err);
    }
    next();
}

export default jwtAuth;