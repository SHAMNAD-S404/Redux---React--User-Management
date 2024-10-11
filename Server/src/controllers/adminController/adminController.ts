 
 import  Jwt  from "jsonwebtoken";
 import { NextFunction, Request,Response } from "express";
 import User from "../../model/user.ts";
import { error } from "console";

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

  export const getData = async (req:Request , res:Response , next:NextFunction) : Promise<Response | any> => {

    try {
        
         return res.status(200).json({success:"validation success"})
        
    } catch (error) {
        console.log(error);
        
    }
  }

  export const getUser = async (req:Request , res:Response , next:NextFunction) : Promise<Response | any> => {

    try {
        const userData = await User.find().select("_id username email")
        if (userData) {
            return res.status(200).json({success:"data fetched successfully", userData})
        }else{
            return res.status(500).json({error:"data fetching failed"})
        }
        
    } catch (error) {
        console.log(error);
        
    }
  }

  export const deleteUser = async (req:Request , res:Response , next:NextFunction) : Promise<Response | any>  => {
    try {
        
        const deleteID = req.params.id;
        const deleteDoc = await User.findByIdAndDelete(deleteID);

        if(deleteDoc){
            return res.status(200).json({success:"success"})
        }else{
            return res.status(500).json({error:"failed"})
        }

    } catch (error) {
        console.error(error);
        
    }
  }

  export const updateUser = async (req:Request , res:Response , next:NextFunction) : Promise<Response | any>  => {

    try {
        
        const updateID = req.params.id;
        const {username,email} = req.body;
        
        const verifyUser = await User.findById(updateID).select("_id")

        if (verifyUser) {

            const update = await User.findByIdAndUpdate(updateID,{username,email},{new:true})

            if (update) {
                return res.status(200).json({success:"updated successfully"})
            }else{
                return res.status(400).json({error:"updated failed"})
            }
            
        }else{
            return res.status(400).json({error:"user not found"})
        }
        
        

    } catch (error) {
        console.error(error);
        
    }
  }

  