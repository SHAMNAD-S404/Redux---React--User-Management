
    export const errorHandler = (statusCode:number, message:string) => {

        const error = new Error()
        error.message = message;
        error.name = statusCode.toString()
        return error
    }