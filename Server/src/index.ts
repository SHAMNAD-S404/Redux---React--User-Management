
    
import express,{ Request,Response , NextFunction, ErrorRequestHandler } from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './utility/db.ts';
import userRoute from './routes/userRoutes/userRoute.ts' ;
import authRoute from './routes/userRoutes/authRoute.ts' ;
import cookieParser from 'cookie-parser';

    const app = express();
    const PORT = process.env.PORT  || 5005

    //connect to mongodb
    connectDB();

    app.use(express.json())
    app.use(cookieParser())

    //user route handling
    app.use('/api/user',userRoute)
    app.use('/api/auth',authRoute)

    
    //error middleware
    const errorHandler:ErrorRequestHandler = ((err,req,res,next)  => {

        const statusCode = (err as any).statusCode || 500;
        const message    = err.message || "Internal server error";
        
        res.status(statusCode).json({
            success:false,
            message,
            statusCode
        })

    })

    app.use(errorHandler)


    app.listen(PORT,() => {
        console.log(`app is running on http://localhost:${PORT}`);
        
    })