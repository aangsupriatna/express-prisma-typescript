import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

// CRUD here

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findMany({
        include: { company: true }
    })
    return res.status(200).json(user)
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body
    console.log(req.file)

    const hashPwd = await bcrypt.hashSync(password, 10)
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPwd
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
        include: {
            company: true
        }
    })
    return res.status(200).json(user)
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    let { name, email, password, role } = req.body

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
            role
        }
    })
    return res.status(200).json(user)
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