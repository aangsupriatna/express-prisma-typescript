import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const project = await prisma.project.findMany({
            select: {
                id: true,
                title: true,
                location: true,
                finished: true,
                company: {
                    select: {
                        id: true,
                        name: true,
                        address: true
                    }
                }
            }
        })
        return res.status(200).json(project)
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
    let { title, location, companyId } = req.body
    try {
        const project = await prisma.project.create({
            data: {
                title,
                location,
                companyId
            }
        })
        return res.status(200).json(project)
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
        const project = await prisma.project.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                location: true,
                finished: true,
                company: {
                    select: {
                        id: true,
                        name: true,
                        address: true
                    }
                }
            }
        })
        return res.status(200).json(project)
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
        let { title, location, companyId, finished } = req.body
        const project = await prisma.project.update({
            where: {
                id: id
            },
            data: {
                title,
                location,
                companyId,
                finished
            }
        })
        return res.status(200).json(project)
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
        const result = await prisma.project.delete({
            where: {
                id: id
            }
        })
        return res.status(200).json(result)
    } catch (error) {
        return res.status(401).json(error)
    }
}