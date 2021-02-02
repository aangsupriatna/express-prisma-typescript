import express from 'express'
import { isAuth } from '../middleware/auth'
const router = express.Router()

import auth from './auth'
import users from './users'
import companies from './companies'
import projects from './projects'
import experts from './experts'

router.use('/test', (req, res) => {
    res.send('Hello, test')
})

router.use('/auth', auth)
router.use('/users', isAuth, users)
router.use('/companies', isAuth, companies)
router.use('/projects', isAuth, projects)
router.use('/experts', isAuth, experts)

export default router