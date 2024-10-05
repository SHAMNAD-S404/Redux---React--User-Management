    import {Request , Response , NextFunction} from 'express'
    import jwt from 'jsonwebtoken'
    import { errorHandler } from './error';


    export const verifyToken = (req:Request , res:Response, next:NextFunction) =>   {

        try {

            const token = req.cookies.access_token;
            if(!token) return next(errorHandler(401,"Your not authenticated !!"))

            if(!process.env.JWT_SECRET) return next(errorHandler(404,'json token secret fetching failed'))

            jwt.verify(token,process.env.JWT_SECRET as string,(err:any,user:any) => {
                if(err) return next(errorHandler(403,'Token is not valid'))
                     
                    req.user = user;
                    next();
            })
            
        } catch (error) {
           console.error(error);
           
        }
    }