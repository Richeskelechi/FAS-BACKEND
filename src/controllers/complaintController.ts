import {Request, Response} from "express";
import { addComplaintService, getSingleAdminComplaintService, getSingleUserComplaintService, getAllAdminComplaintService, editAdminComplainService } from "../services/complaintService";

export const addComplain = async(req: Request, res: Response) => {
    try {
        if(req.user){
            const response = await addComplaintService(req.body)
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

export const singleAdminComplain = async(req: Request, res: Response) => {
    try {
        const {id:adminId} = req.params
        if(req.user){
            const response = await getSingleAdminComplaintService(adminId)
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

export const singleUserComplain = async(req: Request, res: Response) => {
    try {
        const {id:userId} = req.params
        if(req.user){
            const response = await getSingleUserComplaintService(userId)
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

export const singleAllAdminComplain = async(req: Request, res: Response) => {
    try {
        if(req.user){
            const response = await getAllAdminComplaintService()
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

export const editAdminComplain = async(req:Request, res: Response) => {
    try {
        const {id:complainId} = req.params;
        if(req.user){
            const response = await editAdminComplainService(complainId)
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
