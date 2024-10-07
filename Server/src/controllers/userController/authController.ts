import express,{ Request, Response , NextFunction } from 'express';
import User from "../../model/user.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { errorHandler } from "../../utility/error.ts";

       
const hashPassword = async (pass: string) => {            //*TO HASH PASSWORD
  try {
    const passwordHash = bcrypt.hashSync(pass, 10);
    return passwordHash;
  } catch (error) {
    console.error(error);
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    const hashPass = await hashPassword(password);
    const newUser = new User({ username, email, password: hashPass });
    await newUser.save();

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    next(errorHandler(404, "something went wrong"));
  }
};

 export const signin = async (req: express.Request,res: express.Response): Promise<Response | any> => {

  try {
    
    const { email, password } = req.body;
    const validUser = await User.findOne({ email }).lean();
    console.log(validUser);
    console.log(1);
    
    
    if (!validUser) {

      
      return res.status(401).json({error:'Invalid Credentials'})
    }
     console.log(2);
    

    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword){
      
      return res.status(401).json({error:'Invalid Credentials'})
    } 

    if (!process.env.JWT_SECRET) {
        console.error('jwt not fetched');
        return;
       
    }

     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    //deleting pass from validUser before sending to client
    const { password:_,...userWithoutPassword } = validUser;

    const expiryDate = new Date(Date.now() + 120000);

    // storing token in cookies in client side
    return res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(userWithoutPassword);
      
  } catch (error) {
    console.log(error);
  
  }
};

export const google = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, photo } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      if (!process.env.JWT_SECRET) {
        return next(errorHandler(501, "JWT-SECRET is not defined in env"));
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const { password:_,...rest } = user;
      const expiryDate = new Date(Date.now() + 120000);

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
      const { password:_,...rest } = newUser;
      const expiryDate = new Date(Date.now() + 120000);

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.error(error);
    
    next(errorHandler(500,'failed to authenticate with google'));
  }
};
