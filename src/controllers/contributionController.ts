import {Request, Response} from "express";
import { addContributionService, getAllContributionService, getSingleContributionService, getSingleEventContributionService, updateContributionService, deleteContributionService} from "../services/contributionService"

export const addContribution = async (req: Request, res: Response): Promise<void> => {
    try {
        if(req.user){
            const response = await addContributionService(req.body)
             res.status(response.status).json(response)
        }else{
             res.status(400).json({
                status:400,
                message: "Unauthorized User"
            })
        }
    } catch (error) {
         res.status(500).json(error)
    }
}

export const allContribution = async (req: Request, res: Response): Promise<void> => {
    try{
        if(req.user){
            const response = await getAllContributionService()
             res.status(response.status).json(response)
        }else{
             res.status(401).json({
                status:401,
                message: "Unauthorized User"
            })
        }
    }catch(err){
         res.status(500).json(err)
    }
};

export const singleContribution= async (req: Request, res: Response): Promise<void> => {
    try {
        const {contributionId} = req.params
        if(req.user){
            const response = await getSingleContributionService(contributionId)
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

export const singleEventContribution= async (req: Request, res: Response): Promise<void> => {
    try {
        const {eventId} = req.params
        if(req.user){
            const response = await getSingleEventContributionService(eventId)
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

export const updateContribution= async (req: Request, res: Response): Promise<void> => {
    try {
        const {contributionId} = req.params
        if(req.user){
            const response = await updateContributionService(contributionId, req.body)
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

export const deleteContribution= async (req: Request, res: Response): Promise<void> => {
    try {
        const {contributionId} = req.params
        if(req.user){
            const response = await deleteContributionService(contributionId)
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