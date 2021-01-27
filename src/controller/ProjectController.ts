import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function get(req: Request, res: Response, next: NextFunction) {
    const project = await prisma.project.findMany({
        include: {
            company: true
        }
    })
    return res.status(200).json(project)
}

async function store(req: Request, res: Response, next: NextFunction) {
    const { title, location, companyId } = req.body
    const project = await prisma.project.create({
        data: {
            title,
            location,
            companyId
        }
    })
    return res.status(200).json(project)
}

async function show(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    const project = await prisma.project.findUnique({
        where: {
            id: id
        },
        include: {
            company: true
        }
    })
    return res.status(200).json(project)
}

async function update(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    const { title, location, companyId, finished } = req.body
    const project = await prisma.project.update({
        where: {
            id: id
        },
        data: {
            title,
            location,
            companyId,
            finished
        }
    })
    return res.status(200).json(project)
}

async function destroy(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const result = await prisma.project.delete({
        where: {
            id: id
        }
    })
    return res.status(200).json(result)
}

export default {
    get,
    store,
    show,
    update,
    destroy
}