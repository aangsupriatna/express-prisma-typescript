import express from 'express'
const router = express.Router()
import { isAuth, whoami } from '../middleware/auth'
import { signIn, signOut } from '../controller/AuthController'
import { store } from '../controller/UserController'

router.post('/signup', store)
router.post('/signin', signIn)
router.post('/signout', signOut)
router.get('/whoami', isAuth, whoami)

export default router