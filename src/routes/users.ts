import express from 'express'
import { isAuthorized } from '../middleware/auth'
import { validate, checkForErrors } from '../middleware/validator'
import { get, store, show, update, destroy } from '../controller/UserController'
const router = express.Router()

router.get('/', get)
router.post('/', isAuthorized, validate, checkForErrors, store)
router.get('/:id', show)
router.put('/:id', isAuthorized, update)
router.delete('/:id', isAuthorized, destroy)

export default router