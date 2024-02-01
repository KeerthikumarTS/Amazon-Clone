export class ErrorHandler extends Error{
    constructor(message,statuscode){
        super(message)
        this.stauscode = statuscode;
        Error.captureStackTrace(this, this.constructor)
    }
}

