import {Request, Response} from "express";
import { addFunNumberService, getAllFunNumbersService, getSingleFunNumberByIDService, getSingleFunNumberService, updateFunNumberService, deleteFunNumberService} from "../services/funNumberService"

export const addFunNumber = async(req: Request, res: Response) => {
    try {
        if(req.user){
            const response = await addFunNumberService(req.body)
            return res.status(response.status).json(response)
        }else{
            return res.status(400).json({
                status:400,
                message: "Unauthorized User"
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const allFunNumber = async(req: Request, res: Response) => {
    try{
        if(req.user){
            const response = await getAllFunNumbersService()
            return res.status(response.status).json(response)
        }else{
            return res.status(401).json({
                status:401,
                message: "Unauthorized User"
            })
        }
    }catch(err){
        return res.status(500).json(err)
    }
};

export const singleFunNumberByID = async(req: Request, res: Response) => {
    try {
        const {id:funNumberId} = req.params
        if(req.user){
            const response = await getSingleFunNumberByIDService(funNumberId)
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

export const singleFunNumber = async(req: Request, res: Response) => {
    try {
        const funNumber:any = req.query.funNumber
        if(req.user){
            const response = await getSingleFunNumberService(funNumber)
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

export const updateFunNumber = async(req:Request, res: Response) => {
    try {
        const {id:funNumberId} = req.params
        if(req.user){
            const response = await updateFunNumberService(funNumberId, req.body)
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

export const deleteFunNumber = async(req:Request, res: Response) => {
    try {
        const {id:funNumberId} = req.params
        if(req.user){
            const response = await deleteFunNumberService(funNumberId)
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