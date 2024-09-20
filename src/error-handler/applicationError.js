
//customize the error class by creating ApplicationError class

export class ApplicationError extends Error{

    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}