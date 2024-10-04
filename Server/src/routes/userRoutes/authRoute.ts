    import express,{Request , Response} from 'express'
    import {signin, signup, google} from '../../controllers/userController/authController.ts'

    const router = express.Router();
    
    router.post('/signup',signup)
          .post('/signin',signin)
          .post('/google',google)

    export default router;

    