import { Request, Response , NextFunction } from "express";
import { errorHandler } from "../../utility/error.ts";
import bcrypt from 'bcryptjs'
import User from "../../model/user";

export const test = async (req: Request, res: Response) => {
  try {
    res.json({
      message: 'API is working!',
    });
  } catch (error) {
    console.error(error);
  }
};




