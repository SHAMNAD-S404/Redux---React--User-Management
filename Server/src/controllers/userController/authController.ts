import express, { Request, Response, NextFunction } from "express";
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

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    const hashPass = await hashPassword(password);
    const newUser = new User({ username, email, password: hashPass });
    await newUser.save();

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    next(errorHandler(404, "something went wrong"));
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email }).lean();
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid credentials"));

    if (!process.env.JWT_SECRET) {
      return next(errorHandler(501, "JWT-SECRET is not defined in env"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    //deleting pass from validUser before sending to client
    const { password:_,...userWithoutPassword } = validUser;

    const expiryDate = new Date(Date.now() + 3600000);

    // storing token in cookies in client side
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    
    next(errorHandler(500,'failed to sign in'));
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
      const { password:_,...rest } = newUser;
      const expiryDate = new Date(Date.now() + 3600000);

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
