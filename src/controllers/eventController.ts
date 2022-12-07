import {Request, Response} from "express";
import { addEventService, getAllEventService, getSingleEventService, updateEventService, editEventStatusService, deleteEventService} from "../services/eventService"

export const addEvent = async(req: Request, res: Response) => {
    try {
        if(req.user){
            const response = await addEventService(req.body)
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

export const allEvent = async(req: Request, res: Response) => {
    try{
        if(req.user){
            const response = await getAllEventService()
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

export const singleEvent= async(req: Request, res: Response) => {
    try {
        const {id:eventId} = req.params
        if(req.user){
            const response = await getSingleEventService(eventId)
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

export const updateEvent = async(req:Request, res: Response) => {
    try {
        const {id:eventId} = req.params
        if(req.user){
            const response = await updateEventService(eventId, req.body)
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

export const editStatusEvent = async(req:Request, res: Response) => {
    try {
        const {id:eventId} = req.params;
        if(req.user){
            const response = await editEventStatusService(eventId)
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

export const deleteEvent = async(req:Request, res: Response) => {
    try {
        const {id:eventId} = req.params
        if(req.user){
            const response = await deleteEventService(eventId)
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