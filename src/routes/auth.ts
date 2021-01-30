import express from 'express'
const router = express.Router()
import { signIn, signOut } from '../controller/AuthController'
import { store } from '../controller/UserController'

router.post('/signup', store)
router.post('/signin', signIn)
router.post('/signout', signOut)

export default router