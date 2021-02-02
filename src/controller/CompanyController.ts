import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const company = await prisma.company.findMany({
            select: {
                id: true,
                name: true,
                address: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                },
                projects: {
                    select: {
                        id: true,
                        title: true,
                        location: true,
                        finished: true
                    }
                }
            }
        })
        return res.status(200).json(company)
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
    let { name, address } = req.body
    try {
        const company = await prisma.company.create({
            data: {
                name,
                address
            }
        })
        return res.status(200).json(company)
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
        const company = await prisma.company.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                address: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                },
                projects: {
                    select: {
                        id: true,
                        title: true,
                        location: true,
                        finished: true
                    }
                }
            }
        })
        return res.status(200).json(company)
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
        let { name, address, userId } = req.body
        const company = await prisma.company.update({
            where: {
                id: id
            },
            data: {
                name,
                address
            }
        })
        return res.status(200).json(company)
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
        const result = await prisma.company.delete({
            where: {
                id: id
            }
        })
        return res.status(200).json(result)
    } catch (error) {
        return res.status(401).json(error)
    }
}