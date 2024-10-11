 
 import express ,{Response,Request,NextFunction} from 'express'
 import { adminLogin, } from '../../controllers/adminController/adminController.ts'
 import { verifyAdminToken } from '../../middleware/adminAuth.ts'

 const app = express.Router();

 app.post('/login',adminLogin)
    .get('/dashboard',verifyAdminToken,(req:Request,res:Response,next:NextFunction) => {
                res.status(200).json({success:"Welcome to admin dashboard"})
    })


 export default app;

 