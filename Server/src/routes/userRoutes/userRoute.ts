import express from 'express';
import { test } from '../../controllers/userController/userController.ts';
import { verifyToken } from '../../utility/verifyUser.ts';

const router = express.Router();

router.get('/', test);
router.post('/update/:id',);

export default router;
