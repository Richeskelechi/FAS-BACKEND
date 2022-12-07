import { IAddEvents } from "../types/eventTypes";
import {validateEvent, validateUpdateEvent} from "../validate/eventValidate"

import { Event } from "../models/event"
import {Admin} from "../models/admin"

export const addEventService = async function (body:IAddEvents){
    try {
        const res = validateEvent(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        const {adminId, eventName, eventDescription} = body
        const admin = await Admin.findOne({_id:adminId})
        if(!admin){
            return {
                status: 500,
                message: 'Admin not found',
                data: null
            }
        }
        const newEvent = new Event({
            adminId: adminId,
            eventName: eventName,
            eventDescription: eventDescription,
        });
        await newEvent.save()
        return {
            status: 201,
            message: 'Success',
            data: newEvent
        }
    }catch (err: any) {
        console.log(err);
        
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Admin with the specified id Does Not Exist',
            }
        }
        return {
            status: 500,
            message: 'Error Adding An Event',
        }
    }
}

export const getAllEventService = async() =>{
    try {
        const allEvents = await Event.find()
        return {
            status: 200,
            message:'Success',
            data: allEvents,
        }
    } catch (err: any) {
        return {
            status: 500,
            message: 'Failed to get All Event Data',
            data: err.message,
        }
    }
}

export const getSingleEventService = async(eventnId:string) =>{
    try {
        let singleEvent = await Event.findById(eventnId).exec()
        if (!singleEvent) {
            return {
                status: 404,
                message:'Failure',
                data: "No Event found",
            }
        }
        return {
            status: 200,
            message:'Success',
            data: singleEvent,
        }
    } catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get An Event with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get an Event with the specified id',
            data: err.message,
        }
    }
}

export const updateEventService = async(eventnId:string,body:IAddEvents)=>{
    try {
        const res = validateUpdateEvent(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        let event = await Event.findById(eventnId).exec()
        if (!event) {
            return {
                status: 404,
                message:'Failure',
                data: "No Event found",
            }
        }
        let updatedEvent = await Event.findOneAndUpdate({_id:eventnId}, body, {
            new: true
        });
        return {
            status: 200,
            message:'Success',
            data: updatedEvent,
        }
    } catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get an Event with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get an Event',
            data: err.message,
        }
    }
}

export const editEventStatusService = async(eventnId: string) =>{
    try {
        let event = await Event.findById(eventnId).exec()
        if (!event) {
            return {
                status: 404,
                message:'Failure',
                data: "No Event found",
            }
        }else {
            if(event.eventStatus==='Ongoing'){
                await Event.findOneAndUpdate({_id:eventnId}, {eventStatus:"Ended"}, {
                    new: true
                })
            }else if(event.eventStatus==='Ended'){
                await Event.findOneAndUpdate({_id:eventnId}, {eventStatus:"Ongoing"}, {
                    new: true
                })
            }
            return {
                status: 200,
                message:'Success', 
                data: "Operation Executed successfully",
            }
        }
    }catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get an Event with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get an Event with the specified id',
            data: err.message,
        }
    }

}

export const deleteEventService = async(eventnId: string) =>{
    try {
        let event = await Event.findById(eventnId).exec()
        if (!event) {
            return {
                status: 404,
                message:'Failure',
                data: "No Event found",
            }
        }else {
            await Event.findOneAndUpdate({_id:eventnId}, {isActive:!event.isActive}, {
                new: true
            })
            return {
                status: 200,
                message:'Success', 
                data: "Operation Executed successfully",
            }
        }
    }catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get an Event with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get an Event with the specified id',
            data: err.message,
        }
    }

}