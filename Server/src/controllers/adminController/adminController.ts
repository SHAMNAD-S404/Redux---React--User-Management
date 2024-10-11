 
 import  Jwt  from "jsonwebtoken";
 import { NextFunction, Request,Response } from "express";

 export const adminLogin = async (req:Request,res:Response) : Promise<Response | any> => {
    try {
    console.log('im in backend');
    
        const {adminId , password} = req.body;
        console.log(req.body);
        

        if(!process.env.ADMIN_ID || !process.env.ADMIN_PASS || !process.env.JWT_SECRET_ADMIN ){
            return res.status(500).json({error:'Environment variable not fetched'})
        }

        if(adminId === process.env.ADMIN_ID && password === process.env.ADMIN_PASS){
            const token = Jwt.sign({id:adminId,role:'admin'},process.env.JWT_SECRET_ADMIN,{expiresIn:'1h'});

            //storing jwt in cookies
            console.log('im success');
            
            res.cookie('admin_token',token,{ httpOnly:true,maxAge:60*60*1000 })
            return res.status(200).json({success:'admin login successfull', token ,adminId})
            
        }else{
            return res.status(401).json({error:"Invalid credentials"})
        }
        
    } catch (error) {
        console.log(error);
        
    }
 }

  export const adminLogout = async (req:Request , res: Response , next : NextFunction) : Promise<Response|any> => {

            try {
                
                return res.clearCookie("admin_token").status(200).json({success:"successfully signed out"})

            } catch (error) {
                console.log(error);
                
            }
  }