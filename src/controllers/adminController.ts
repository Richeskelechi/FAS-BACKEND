
import {Request, Response} from "express";
import { addAdminService, loginAdminService, getAllAdminService, getSingleAdminService, updateAdminService, changeAccessService, blockAdminService, deleteAdminService} from "../services/adminService"

export const addAdmin = async(req: Request, res: Response) => {
    try {
        const response = await addAdminService(req.body)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const loginAdmin = async(req: Request, res: Response) => {
    try {
        const response = await loginAdminService(req.body)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}

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

export const updateAdmin = async(req:Request, res: Response) => {
    try {
        const {id:adminId} = req.params
        const response = await updateAdminService(adminId, req.body)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
};

export const changeAccess = async(req:Request, res: Response) => {
    try {
        const {id:adminId} = req.params
        const response = await changeAccessService(adminId, req.body)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
};

export const blockAdmin = async(req:Request, res: Response) => {
    try {
        const {id:adminId} = req.params
        const response = await blockAdminService(adminId)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
};

export const deleteAdmin = async(req:Request, res: Response) => {
    try {
        const {id:adminId} = req.params
        const response = await deleteAdminService(adminId)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
};