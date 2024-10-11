
    import jwt, {JwtPayload } from 'jsonwebtoken'
    import { Request , Response , NextFunction } from 'express'

    interface AdminJwtPayload extends JwtPayload {
        id:string;
        role:string;
        
    }

    export const verifyAdminToken = async(req:Request, res:Response, next:NextFunction) : Promise<Response | any> => {

        const token = req.cookies.admin_token;

        if(!token) return res.status(401).json({error:"Unazuthorized access"})

        if(!process.env.JWT_SECRET_ADMIN){
            console.error("env variables not fetched");
            return
        }  

        try {

            const decoded = jwt.verify(token,process.env.JWT_SECRET_ADMIN as string) as AdminJwtPayload;

            if((decoded as any).role !== "admin"){
                return res.status(403).json({error:"Access denied"});
            }

            (req as any).user = decoded.id;
            

        } catch (error) {
            console.error(error);
            
        }
    }