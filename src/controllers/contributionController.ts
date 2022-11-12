import {Request, Response} from "express";
import { addContributionService, getAllContributionService, getSingleContributionService, updateContributionService, editContributionStatusService, deleteContributionService} from "../services/contributionService"

export const addContribution = async(req: Request, res: Response) => {
    try {
        if(req.user){
            const response = await addContributionService(req.body)
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

export const allContribution = async(req: Request, res: Response) => {
    try{
        if(req.user){
            const response = await getAllContributionService()
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

export const singleContribution = async(req: Request, res: Response) => {
    try {
        const {id:contributionId} = req.params
        if(req.user){
            const response = await getSingleContributionService(contributionId)
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

export const updateContribution = async(req:Request, res: Response) => {
    try {
        const {id:contributionId} = req.params
        if(req.user){
            const response = await updateContributionService(contributionId, req.body)
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

export const editStatusContribution = async(req:Request, res: Response) => {
    try {
        const {id:contributionId} = req.params;
        if(req.user){
            const response = await editContributionStatusService(contributionId)
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

export const deleteContribution = async(req:Request, res: Response) => {
    try {
        const {id:contributionId} = req.params
        if(req.user){
            const response = await deleteContributionService(contributionId)
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