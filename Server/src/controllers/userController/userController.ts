
    import express,{ Request, Response } from "express";

    export const test = async(req:Request,res:Response) => {
        try {

            res.send(`new from database`)
            
        } catch (error) {
            console.error(error);
            
        }
    }


  