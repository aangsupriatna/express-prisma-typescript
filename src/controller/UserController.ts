import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
    get,
    store,
    show,
    update,
    destroy
}