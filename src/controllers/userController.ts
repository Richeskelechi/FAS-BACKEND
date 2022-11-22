import {Request, Response} from "express";
import { validateFunNumberService, createUserService, loginUserService, getSingleUserService, updateUserService, changeUserPasswordService, resetUserPasswordEmailService, resetUserPasswordEmailValidateService } from "../services/userService"

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

export const singleUser = async(req: Request, res: Response) => {
    try {
        const {id:userId} = req.params
        if(req.user === userId){
            const response = await getSingleUserService(userId)
            return res.status(response.status).json(response)
        }else{
            return res.status(401).json({
                status:401,
                message: "Unauthorized User"
            })
        } 
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateUser = async(req:Request, res: Response) => {
    try {
        const {id:userId} = req.params
        if(req.user === userId){
            const response = await updateUserService(userId, req.body)
            return res.status(response.status).json(response)
        }else{
            return res.status(401).json({
                status:401,
                message: "Unauthorized User"
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
};

export const changePasswordUser = async(req:Request, res: Response) => {
    try {
        const {id:userId} = req.params
        if(req.user === userId){
            const response = await changeUserPasswordService(userId, req.body)
            return res.status(response.status).json(response)
        }else{
            return res.status(401).json({
                status:401,
                message: "Unauthorized User"
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
};

export const resetUserPasswordEmailAdmin = async(req:Request, res: Response) => {
    try {
        const response = await resetUserPasswordEmailService(req.body)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
};

export const resetUserPasswordEmailValidateAdmin = async(req:Request, res: Response) => {
    try {
        const response = await resetUserPasswordEmailValidateService(req.body)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
};