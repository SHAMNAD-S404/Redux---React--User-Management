 
 import express  from 'express'
 import { adminLogin,adminLogout,getData ,getUser ,deleteUser,updateUser, } from '../../controllers/adminController/adminController.ts'
 import { verifyAdminToken } from '../../middleware/adminAuth.ts'

 const app = express.Router();

 app.post('/login',adminLogin)
    .get('/dashboard',verifyAdminToken,getData)
    .get('/sign-out',adminLogout)
    .get('/getUser',verifyAdminToken,getUser)
    .delete('/delete-user/:id',verifyAdminToken,deleteUser)
    .patch('/update-user/:id',verifyAdminToken,updateUser)
    


 export default app;

 