class CustomError extends Error {
    constructor(message,statusCode) {
        super(message);
        this.statusCode = statusCode;
        //400 - 500 { fail or server erros }
        this.status = statusCode >= 400 && statusCode <500 ? 'fail' : 'errors';

        Error.captureStackTrace(this,this.constructor);

    
    }
}


module.exports = CustomError;