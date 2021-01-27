import express from 'express'
const router = express.Router();
import company from '../controller/CompanyController'

router.get('/', company.get);
router.post('/', company.store);
router.get('/:id', company.show);
router.put('/:id', company.update);
router.delete('/:id', company.destroy);

export default router