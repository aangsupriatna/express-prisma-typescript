import express from 'express'
const router = express.Router()
import { validate, checkForErrors } from '../middleware/validator'
import user from '../controller/UserController'

router.get('/', user.get)
router.post('/', validate, checkForErrors, user.store)
router.get('/:id', user.show)
router.put('/:id', user.update)
router.delete('/:id', user.destroy)

export default router