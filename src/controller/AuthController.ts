import { Prisma } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
                password: password
            }
        })
        if (!user) {
            return res.status(400).json({ message: 'Wrong email or password' })
        }
        const token = jwt.sign({ email: user.email, role: user.role }, 'topsecret', { expiresIn: '1Y' })
        res.cookie('token', token, { secure: false, httpOnly: true })

        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json(error)
    }

}