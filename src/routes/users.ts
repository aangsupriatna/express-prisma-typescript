import express from 'express'
const router = express.Router()
import { validate, checkForErrors } from '../middleware/validator'
import { get, store, show, update, destroy } from '../controller/UserController'

router.get('/', get)
router.post('/', validate, checkForErrors, store)
router.get('/:id', show)
router.put('/:id', update)
router.delete('/:id', destroy)

export default router