    import express,{Request , Response} from 'express'
    import {signin, signup, google ,signout} from '../../controllers/userController/authController.ts'

    const router = express.Router();
    
    router.post('/signup',signup)
          .post('/signin',signin)
          .post('/google',google)
          .get ('/signout',signout)

    export default router;

    