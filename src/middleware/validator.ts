import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

// validate USERS
export const validate = [
    body('email')
        .isLength({ min: 1 })
        .withMessage('Email must not be empty')
        .isEmail()
        .withMessage('Must be a valid email address'),
    body('name')
        .isLength({ min: 1 })
        .withMessage('Name must not be empty'),
    body('role')
        .isIn(['ADMIN', 'USER', 'SUPERADMIN', undefined])
        .withMessage(`Role must be one of 'ADMIN', 'USER', 'SUPERADMIN'`),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password length too short')
]

const simpleVadationResult = validationResult.withDefaults({
    formatter: (err) => err.msg,
})

export const checkForErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = simpleVadationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped())
    }
    next()
}
