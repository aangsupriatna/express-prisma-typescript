import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface RequestWithUser extends Request {
    user?: any
}

export const isAuth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ 'message': 'You need to signin!' })
        }

        const validToken = await prisma.token.findFirst({
            where: {
                code: token
            }
        })

        if (!validToken) {
            return res.status(401).json({ 'message': 'Token not valid, you need to signin' })
        }
        const tokenCode = validToken.code
        const secretKey: any = process.env.APP_SECRET
        await jwt.verify(tokenCode, secretKey, async (error: any, decode: any) => {
            if (error) {
                return res.status(400).json(error)
            } else {
                const validUser = await prisma.user.findUnique({
                    where: {
                        email: decode.email
                    },
                    select: {
                        email: true,
                        role: true
                    }
                })

                req.user = validUser
            }
        })
    } catch (error) {
        return res.status(401).json(error)
    }
    next()
}

export const isAuthorized = (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (req.user.role == 'ADMIN' || req.user.role == 'SUPERADMIN') {
        next()
    } else {
        return res.status(401).json({ 'message': 'User not authorized' })
    }
}

export const whoami = (req: RequestWithUser, res: Response, next: NextFunction) => {
    return res.status(200).json(req.user)
}