import express from 'express';
import { test, updateProfile } from '../../controllers/userController/userController.ts';
import { verifyToken } from '../../utility/verifyUser.ts';

const app = express.Router();

app.get('/', test)
   .patch('/update-profile',updateProfile)
    

export default app;
