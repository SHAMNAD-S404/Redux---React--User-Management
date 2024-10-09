
    import jwt,{ JwtPayload } from 'jsonwebtoken'
    import {Request,Response , NextFunction} from 'express';
   

    interface DecodedUser extends JwtPayload{
        id:string;
    }

    export const verifyToken = async (req:Request,res:Response,next:NextFunction):Promise<Response | any> => {

        const token = req.cookies?.access_token || req.headers.authorization?.split(' ')[1];

        if(!token){
            return res.status(401).json({error:"Unauthorized"})
        }

        if(!process.env.JWT_SECRET) {
            console.log('jwt not fetched in midware');
            return
        }

       
       try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload | string;
            req.user = decoded;
            next();
        }catch(err){
            return res.status(403).json({ error: 'Invalid token!' });
            
        }
    }