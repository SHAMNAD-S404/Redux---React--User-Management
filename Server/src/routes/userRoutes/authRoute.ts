    import express from 'express'
    import { signin, signup, google,getUser, singout} from '../../controllers/userController/authController.ts'
    import { verifyToken } from '../../middleware/userAuth.ts';

    const router = express.Router();
    
    router.get('/me',verifyToken,getUser)
          .get('/sign-out',verifyToken,singout)
          .post('/signup',signup)
          .post('/signin',signin)
          .post('/google',google)

    export default router;

    