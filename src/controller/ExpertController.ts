import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const expert = await prisma.expert.findMany({
            select: {
                id: true,
                name: true,
                company: {
                    select: {
                        id: true,
                        name: true,
                        address: true
                    }
                }
            }
        })
        return res.status(200).json(expert)
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
    let { name, companyId } = req.body
    try {
        const expert = await prisma.expert.create({
            data: {
                name,
                companyId
            }
        })
        return res.status(200).json(expert)
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
        const expert = await prisma.expert.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                company: {
                    select: {
                        id: true,
                        name: true,
                        address: true
                    }
                }
            }
        })
        return res.status(200).json(expert)
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
        let { name, companyId } = req.body
        const expert = await prisma.expert.update({
            where: {
                id: id
            },
            data: {
                name,
                companyId
            }
        })
        return res.status(200).json(expert)
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
        const result = await prisma.expert.delete({
            where: {
                id: id
            }
        })
        return res.status(200).json(result)
    } catch (error) {
        return res.status(401).json(error)
    }
}