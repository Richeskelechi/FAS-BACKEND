
import {Request, Response} from "express";
import { addAdminService, getAllAdminService, getSingleAdminService} from "../services/adminService"
export const allAdmin = async(req: Request, res: Response) => {
    try{
        const response = await getAllAdminService()
        return res.status(response.status).json(response)
    }catch(err){
        return res.status(500).json(err)
    }
};

export const singleAdmin = async(req: Request, res: Response) => {
    try {
        const {id:adminId} = req.params
        const response = await getSingleAdminService(adminId)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const addAdmin = async(req: Request, res: Response) => {
    try {
        const response = await addAdminService(req.body)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}