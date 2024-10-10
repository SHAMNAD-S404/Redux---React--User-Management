import express, { Request, Response, NextFunction } from 'express';
import User from "../../model/user.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { errorHandler } from "../../utility/error.ts";



const hashPassword = async (pass: string) => {
  try {
    const passwordHash = bcrypt.hashSync(pass, 10);
    return passwordHash;
  } catch (error) {
    console.error(error);
  }
};

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<Response | any> => {

  try {

    const { username, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[A-Za-z ]{4,10}$/;

    if (!usernameRegex.test(username)) {
      return res.status(400).json({ error: "Enter a valid name" })
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Enter a valid email" })
    }

    const isExisting = await User.findOne({ email });

    if (isExisting) {
      return res.status(401).json({ error: 'email id already exist' })
    }

    const hashPass = await hashPassword(password);
    const newUser = new User({ username, email, password: hashPass });
    await newUser.save();

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    next(errorHandler(404, "something went wrong"));
  }
};

export const signin = async (req: express.Request,
 res: express.Response): Promise<Response | any> => {

  try {

    const { email, password } = req.body;
    const validUser = await User.findOne({ email }).lean().select('_id username email profilePicture password')

    if (!validUser) {
      return res.status(401).json({ error: 'Invalid Credentials' })
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid Credentials' })
    }

    if (!process.env.JWT_SECRET) {
      console.error('jwt not fetched');
      return;
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    //deleting pass from validUser before sending to client
     const { password:_,...userWithoutPassword } = validUser;
     
    const expiryDate = new Date(Date.now() + 3600000); //for 5min

    // storing token in cookies in client side
    return res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate, secure: true })
      .status(200)
      .json({ user: userWithoutPassword });

  } catch (error) {
    console.log(error);

  }
};

export const google = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { name, email, photo } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      if (!process.env.JWT_SECRET) {
        return next(errorHandler(501, "JWT-SECRET is not defined in env"));
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const { password: _, ...rest } = user;
      const expiryDate = new Date(Date.now() + 3600000);

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      //if the user have no account
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = await hashPassword(generatedPassword);

      const newUser = new User({
        username: name,
        email: email,
        password: hashedPassword,
        profilePicture: photo,
      });

      await newUser.save();

      if (!process.env.JWT_SECRET) {
        return next(errorHandler(501, "JWT-SECRET is not defined in env"));
      }

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: _, ...rest } = newUser;
      const expiryDate = new Date(Date.now() + 3600000);

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json({user:rest});
    }
  } catch (error) {
    console.error(error);

    next(errorHandler(500, 'failed to authenticate with google'));
  }
};



export const singout = async(req:Request , res:Response , next:NextFunction) : Promise<Response | any > => {

  try {

    res.clearCookie("access_token").status(200).json({success:'successfully loged out'})
    
  } catch (error) {
    console.error(error);
    next(errorHandler(500,'something went wrong'+error))
    
  }

}

export const getUser = async (req:Request,res:Response,next:NextFunction) :Promise<Response | any> => {

  try {
    const userID = (req as any).user;

    if(!userID) return res.status(401).json({error:'userId not fetched '})
    
    const getData = await User.findById(userID).select('_id username email profilePicture')
    

    if (!getData) {
      return res.status(401).json({error:"Un authorized"})
    }else{
      
      return res.status(200).json({user:getData })
    }
    
  } catch (error) {
    console.log('fetching getuser error',error); 
  }

}
