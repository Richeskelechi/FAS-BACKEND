import {Request, Response} from "express";
import { validateFunNumberService, createUserService, loginUserService, getSingleUserService, updateUserService, changeUserPasswordService, resetUserPasswordEmailService, resetUserPasswordEmailValidateService } from "../services/userService"

export const validateFunNumber = async (req: Request, res: Response): Promise<void> => {
    try {
        const funNumber:string = req.body.funNumber
        const response = await validateFunNumberService(funNumber)
         res.status(response!.status).json(response)
    } catch (error) {
         res.status(500).json(error)
    }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await createUserService(req.body)
         res.status(response.status).json(response)
    } catch (error) {
         res.status(500).json(error)
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await loginUserService(req.body)
         res.status(response.status).json(response)
    } catch (error) {
         res.status(500).json(error)
    }
}

export const singleUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id:userId} = req.params
        if(req.user === userId){
            const response = await getSingleUserService(userId)
             res.status(response.status).json(response)
        }else{
             res.status(401).json({
                status:401,
                message: "Unauthorized User"
            })
        } 
    } catch (error) {
         res.status(500).json(error)
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id:userId} = req.params
        if(req.user === userId){
            const response = await updateUserService(userId, req.body)
             res.status(response.status).json(response)
        }else{
             res.status(401).json({
                status:401,
                message: "Unauthorized User"
            })
        }
    } catch (error) {
         res.status(500).json(error)
    }
};

export const changePasswordUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id:userId} = req.params
        if(req.user === userId){
            const response = await changeUserPasswordService(userId, req.body)
             res.status(response.status).json(response)
        }else{
             res.status(401).json({
                status:401,
                message: "Unauthorized User"
            })
        }
    } catch (error) {
         res.status(500).json(error)
    }
};

export const resetUserPasswordEmailAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await resetUserPasswordEmailService(req.body)
         res.status(response.status).json(response)
    } catch (error) {
         res.status(500).json(error)
    }
};

export const resetUserPasswordEmailValidateAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await resetUserPasswordEmailValidateService(req.body)
         res.status(response.status).json(response)
    } catch (error) {
         res.status(500).json(error)
    }
};