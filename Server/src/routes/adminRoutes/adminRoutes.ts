 
 import express  from 'express'
 import { adminLogin,adminLogout,getData ,getUser ,deleteUser,updateUser,getAdmin } from '../../controllers/adminController/adminController.ts'
 import { verifyAdminToken } from '../../middleware/adminAuth.ts'

 const app = express.Router();

 app.post('/login',adminLogin)
    .get('/dashboard',verifyAdminToken,getData)
    .get('/sign-out',adminLogout)
    .get('/getUser',verifyAdminToken,getUser)
    .get('/me',verifyAdminToken,getAdmin)
    .delete('/delete-user/:id',verifyAdminToken,deleteUser)
    .patch('/update-user/:id',verifyAdminToken,updateUser)
    


 export default app;

 