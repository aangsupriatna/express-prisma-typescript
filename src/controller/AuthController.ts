import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

const prisma = new PrismaClient()
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET }: any = process.env

export const createAccesToken = async (userid: string, email: string) => {
    const jwtid = uuidv4()
    const accessToken = await jwt.sign(
        { user: { userid, email } },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "1d", jwtid: jwtid, subject: userid }
    )
    const refreshToken = await createRefreshToken(userid, jwtid)
    return { accessToken, refreshToken }
}

export const createRefreshToken = async (userid: string, jwtid: string) => {
    let refreshToken = await prisma.token.create({
        data: {
            userId: userid,
            jwtId: jwtid,
            expiredDate: moment().add(10, "d").toDate()
        }
    })
    return refreshToken.id
}

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

        // const secretKey: any = process.env.APP_SECRET
        const token = await createAccesToken(user.id, user.email)
        // const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1d' })
        // const saveToken = await prisma.token.create({
        //     data: {
        //         code: token
        //     }
        // })
        // res.cookie('token', token, { secure: false, httpOnly: true })
        console.log(token)
        return res.status(200).json(token)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const delToken = await prisma.token.delete({
            where: {
                // code: req.cookies.token
            }
        })
        res.status(200).json(delToken)

    } catch (error) {
        return res.status(401).json({ error })
    }
}