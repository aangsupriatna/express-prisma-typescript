import express from 'express'
const router = express.Router();
import project from '../controller/ProjectController'

router.get('/', project.get);
router.post('/', project.store);
router.get('/:id', project.show);
router.put('/:id', project.update);
router.delete('/:id', project.destroy);

export default router