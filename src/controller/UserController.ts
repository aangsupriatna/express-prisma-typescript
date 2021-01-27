import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { body, validationResult } from 'express-validator'

const prisma = new PrismaClient()

// validate request
const validate = [
    body('email')
        .isLength({ min: 1 })
        .withMessage('Email must not be empty')
        .isEmail()
        .withMessage('Must be a valid email address'),
    body('name')
        .isLength({ min: 1 })
        .withMessage('Name must not be empty'),
    body('role')
        .isIn(['ADMIN', 'USER', 'SUPERADMIN', undefined])
        .withMessage(`Role must be one of 'ADMIN', 'USER', 'SUPERADMIN'`),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password length too short')
]

const simpleVadationResult = validationResult.withDefaults({
    formatter: (err) => err.msg,
})

const checkForErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = simpleVadationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped())
    }
    next()
}

// CRUD here
async function get(req: Request, res: Response, next: NextFunction) {
    const user = await prisma.user.findMany({
        include: { company: true }
    })
    return res.status(200).json(user)
}

async function store(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })
    return res.status(200).json(user)
}

async function show(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        include: {
            company: true
        }
    })
    return res.status(200).json(user)
}

async function update(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    const { name, email, password, role } = req.body
    const user = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            name,
            email,
            password,
            role
        }
    })
    return res.status(200).json(user)
}

async function destroy(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const result = await prisma.user.delete({
        where: {
            id: id
        }
    })
    return res.status(200).json(result)
}

export default {
    validate,
    checkForErrors,
    get,
    store,
    show,
    update,
    destroy
}