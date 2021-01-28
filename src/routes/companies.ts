import express from 'express'
const router = express.Router();
import { get, store, show, update, destroy } from '../controller/CompanyController'

router.get('/', get);
router.post('/', store);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router