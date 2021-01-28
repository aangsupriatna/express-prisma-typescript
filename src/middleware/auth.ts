import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface RequestWithUser extends Request {
    user?: any
}

export const isAuth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ 'message': 'You need to signin!' })
    }

    await jwt.verify(token, 'topsecret', (error: any, decode: any) => {
        if (error) {
            return res.status(400).json(error)
        } else {
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