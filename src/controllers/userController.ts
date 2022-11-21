import {Request, Response} from "express";
import { validateFunNumberService, createUserService, loginUserService } from "../services/userService"

export const validateFunNumber = async(req: Request, res: Response) => {
    try {
        const funNumber:string = req.body.funNumber
        const response = await validateFunNumberService(funNumber)
        return res.status(response!.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const createUser = async(req: Request, res: Response) => {
    try {
        const response = await createUserService(req.body)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const loginUser = async(req: Request, res: Response) => {
    try {
        const response = await loginUserService(req.body)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}