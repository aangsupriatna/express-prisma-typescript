import express from 'express'
const router = express.Router();
import { isAuth } from '../middleware/auth'
import { signIn, signOut } from '../controller/AuthController'

router.post('/signin', signIn);
router.post('/signout', signOut);

export default router