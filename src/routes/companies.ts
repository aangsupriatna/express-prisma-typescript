import express from 'express'
import { isAuthorized } from '../middleware/auth'
import { get, store, show, update, destroy } from '../controller/CompanyController'
const router = express.Router();

router.get('/', get);
router.post('/', isAuthorized, store);
router.get('/:id', show);
router.put('/:id', isAuthorized, update);
router.delete('/:id', isAuthorized, destroy);

export default router