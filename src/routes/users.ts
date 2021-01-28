import express from 'express'
const router = express.Router()
import { isAuthorized, isAuth } from '../middleware/auth'
import { validate, checkForErrors } from '../middleware/validator'
import { get, store, show, update, destroy } from '../controller/UserController'

router.get('/', get)
router.post('/', isAuthorized, validate, checkForErrors, store)
router.get('/:id', show)
router.put('/:id', update)
router.delete('/:id', destroy)

export default router