    
    import express,{Request , Response} from 'express' ;
    import {test} from '../../controllers/userController/userController.ts'

    const app = express.Router();

    app.get('/' ,test) 
       .post('')



    export default app;


