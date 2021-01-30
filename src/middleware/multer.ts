import express, { Request, Response, NextFunction } from 'express'
import multer from 'multer'
const up = multer({ dest: 'uploads/' })
const app = express()

app.post('/profile', up.single('avatar'), (req: Request, res: Response, next: NextFunction) => {

})

export const upload = async (req: Request, res: Response, next: NextFunction) => {

}