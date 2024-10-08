  import { Request, Response , NextFunction } from "express";
  import { errorHandler } from "../../utility/error.ts";
  import bcrypt from 'bcryptjs'
  import User from "../../model/user.ts";

  export const test = async (req: Request, res: Response) => {
    try {
      res.json({
        message: 'API is working!',
      });
    } catch (error) {
      console.error(error);
    }
  };

  export const updateProfile = async(req:Request,res:Response,next:NextFunction) : Promise<Response | any> => {

    try {

        const{username , email, profilePicture} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[A-Za-z ]{4,10}$/;

        if(!usernameRegex.test(username)){
          return res.status(401).json({error:"enter a valid name"});
        }
        if(!emailRegex.test(email)){
          return res.status(401).json({error:"enter valid email"})
        }

        const updateData : {[key:string]:string} = {username,email};
        if (profilePicture) {
          updateData.profilePicture = profilePicture;
        }

        const userUpdate = await User.findOneAndUpdate({email},
          updateData,
          {new:true}
        )       
          
        if(userUpdate){
            return res.status(200).json({success:'Successfully updated'})
         }else{
           return res.status(400).json({error:'something went wrong try again'})
         }
        
        
    } catch (error) {
      console.error(error);
      next(errorHandler(404,(error as string)))
      
    }
  }




