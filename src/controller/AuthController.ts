import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(401).json({ message: 'Wrong password' })
        }

        const secretKey: any = process.env.APP_SECRET
        const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1d' })
        const saveToken = await prisma.token.create({
            data: {
                code: token
            }
        })
        res.cookie('token', token, { secure: false, httpOnly: true })

        return res.status(200).json(saveToken)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const signOut = async (req: Request, res: Response, next: NextFunction) => {
    const delToken = await prisma.token.delete({
        where: {
            code: req.cookies.token
        }
    })
    res.status(200).json(delToken)
}