import express from 'express'
import multer from 'multer'
import { isAuthorized } from '../middleware/auth'
import { validate, checkForErrors } from '../middleware/validator'
import { get, store, show, update, destroy } from '../controller/UserController'
const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.get('/', get)
router.post('/', upload.single('avatar'), isAuthorized, validate, checkForErrors, store)
router.get('/:id', show)
router.put('/:id', update)
router.delete('/:id', isAuthorized, destroy)

export default router