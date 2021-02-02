import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

// CRUD here

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            profile: {
                select: {
                    address: true
                }
            },
            company: {
                select: {
                    name: true,
                    address: true
                }
            }
        }
    })
    return res.status(200).json(user)
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
    let { name, email, password } = req.body
    console.log(req.file)

    const hashPwd = await bcrypt.hashSync(password, 10)
    password = hashPwd
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password
        },
        select: {
            name: true,
            email: true
        }
    })
    return res.status(200).json(user)
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
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
                    address: true
                }
            },
            company: {
                select: {
                    name: true,
                    address: true
                }
            }
        }
    })
    return res.status(200).json(user)
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    let { name, email, password, role, address } = req.body

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
    const id = req.params.id;
    const result = await prisma.user.delete({
        where: {
            id: id
        }
    })
    return res.status(200).json(result)
}