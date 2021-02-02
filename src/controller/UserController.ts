import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                profile: {
                    select: {
                        id: true,
                        address: true
                    }
                },
                company: {
                    select: {
                        id: true,
                        name: true,
                        address: true
                    }
                }
            }
        })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
    let { name, email, password, companyId } = req.body
    try {
        const hashPwd = await bcrypt.hashSync(password, 10)
        password = hashPwd
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                companyId
            },
            select: {
                name: true,
                email: true
            }
        })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                profile: {
                    select: {
                        id: true,
                        address: true
                    }
                },
                company: {
                    select: {
                        id: true,
                        name: true,
                        address: true
                    }
                }
            }
        })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    let { name, email, password, role, address, companyId } = req.body

    try {
        if (password) {
            const hashPwd = await bcrypt.hashSync(password, 10)
            password = hashPwd
        }
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name,
                email,
                password,
                role,
                companyId,
                profile: {
                    upsert: {
                        create: { address: address },
                        update: { address: address }
                    }
                }
            }
        })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
        const result = await prisma.user.delete({
            where: {
                id: id
            }
        })
        return res.status(200).json(result)
    } catch (error) {
        return res.status(401).json(error)
    }
}