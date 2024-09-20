
import fs from 'fs';
import winston from 'winston';

const fsPromise = fs.promises;

// const log = async (logData) => {

//     try{
//         logData = `\n${new Date().toString()} - ${logData}`;
//         fsPromise.appendFile('log.txt', logData);
//     }catch(err){
//         console.log(err);
//     }
// }

//define logger configuration
const logger = winston.createLogger({
    //lowest level of logging
    level: 'info',
    format: winston.format.json(), //in which format you want to log the data
    defaultMeta: { service: 'request-logging' }, //what kind of logging you want
    transports: [
        //how you want to use the logData
        //wheather you want to console that logData
        //or you want to append the logData into some file
        // new winston.transports.Console(),
        new winston.transports.File({ filename: 'log.txt' })
      ]
});

export const loggerMiddleWare = async (req, res, next) => {
    if(!req.url.includes("signIn")){
        const logData = `${req.url} - ${JSON.stringify(req.body)}`;
        // await log(logData);
        logger.info(logData);
    }
    next();
}