import express from 'express'
const router = express.Router()

import users from './users'
import companies from './companies'
import projects from './projects'

router.use('/test', (req, res) => {
    res.send('Hello, test')
})

router.use('/users', users)
router.use('/companies', companies)
router.use('/projects', projects)

export default router