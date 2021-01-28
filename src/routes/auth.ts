import express from 'express'
const router = express.Router();
import { isAuth } from '../middleware/auth'
import { signIn } from '../controller/AuthController'

router.post('/signin', signIn);

export default router