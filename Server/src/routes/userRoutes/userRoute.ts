import express from 'express';
import { test, updateProfile } from '../../controllers/userController/userController.ts';
import { verifyToken } from '../../middleware/userAuth.ts'


const app = express.Router();

app.get('/', test)
   .patch('/update-profile',verifyToken,updateProfile)
    

export default app;
