import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const company = await prisma.company.findMany({
        include: {
            user: true,
            projects: true
        }
    })
    return res.status(200).json(company)
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
    let { name, address, userId } = req.body
    const company = await prisma.company.create({
        data: {
            name,
            address,
            userId
        }
    })
    return res.status(200).json(company)
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
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

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    let { name, address, userId } = req.body
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

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await prisma.company.delete({
        where: {
            id: id
        }
    })
    return res.status(200).json(result)
}