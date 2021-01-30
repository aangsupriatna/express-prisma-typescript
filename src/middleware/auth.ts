import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface RequestWithUser extends Request {
    user?: any
}

export const isAuth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
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

    await jwt.verify(tokenCode, 'topsecret', (error: any, decode: any) => {
        if (error) {
            return res.status(400).json(error)
        } else {
            console.log(decode)
            req.user = decode
        }
    })
    next()
}

export const isAuthorized = (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (req.user.role == 'ADMIN') {
        next()
    } else {
        return res.status(401).json({ 'message': 'User not authorized' })
    }
}

export const whoami = (req: RequestWithUser, res: Response, next: NextFunction) => {
    return res.status(200).json(req.user)
}