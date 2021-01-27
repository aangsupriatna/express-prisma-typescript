import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function get(req: Request, res: Response, next: NextFunction) {
    const company = await prisma.company.findMany({
        include: {
            user: true
        }
    })
    return res.status(200).json(company)
}

async function store(req: Request, res: Response, next: NextFunction) {
    const { name, address, userId } = req.body
    const company = await prisma.company.create({
        data: {
            name,
            address,
            userId
        }
    })
    return res.status(200).json(company)
}

async function show(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    const company = await prisma.company.findUnique({
        where: {
            id: id
        },
        include: {
            user: true
        }
    })
    return res.status(200).json(company)
}

async function update(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    const { name, address, userId } = req.body
    const company = await prisma.company.update({
        where: {
            id: id
        },
        data: {
            name,
            address,
            userId
        }
    })
    return res.status(200).json(company)
}

async function destroy(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const result = await prisma.company.delete({
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