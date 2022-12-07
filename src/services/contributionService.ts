import { IAddContributions } from "../types/contributionTypes";
import { validateContribution,validateUpdateContribution } from "../validate/contributionValidate"

import { Event } from "../models/event"
import {Admin} from "../models/admin"
import {Contribution} from "../models/contribution";

export const addContributionService = async function (body:IAddContributions){
    try {
        const res = validateContribution(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        const {adminId, eventId, contributorName, contributionAmount} = body
        const admin = await Admin.findOne({_id:adminId})
        if(!admin){
            return {
                status: 500,
                message: 'Admin not found',
                data: null
            }
        }
        const event = await Event.findOne({_id:eventId})
        if(!event){
            return {
                status: 500,
                message: 'Event not found',
                data: null
            }
        }
        const newContribution = new Contribution({
            adminId: adminId,
            eventId: eventId,
            contributorName: contributorName,
            contributionAmount: contributionAmount,
        });
        await newContribution.save()
        return {
            status: 201,
            message: 'Success',
            data: newContribution
        }
    }catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Admin/Event with the specified id Does Not Exist',
            }
        }
        return {
            status: 500,
            message: 'Error Adding An Event',
        }
    }
}

export const getAllContributionService = async() =>{
    try {
        const allContributions = await Contribution.find()
        return {
            status: 200,
            message:'Success',
            data: allContributions,
        }
    } catch (err: any) {
        return {
            status: 500,
            message: 'Failed to get All Contribution Data',
            data: err.message,
        }
    }
}

export const getSingleContributionService = async(contributionId:string) =>{
    try {
        let singleContribution = await Contribution.findById(contributionId).exec()
        if (!singleContribution) {
            return {
                status: 404,
                message:'Failure',
                data: "No Contribution found",
            }
        }
        return {
            status: 200,
            message:'Success',
            data: singleContribution,
        }
    } catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get A Contribution with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get A Contribution with the specified id',
            data: err.message,
        }
    }
}

export const getSingleEventContributionService = async(eventId:string) =>{
    try {
        let eventContribution = await Contribution.find({eventId:eventId}).exec()
        if (!eventContribution) {
            return {
                status: 404,
                message:'Failure',
                data: "No Contribution For This Event found",
            }
        }
        return {
            status: 200,
            message:'Success',
            data: eventContribution,
        }
    } catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get A Contribution with the specified Event id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get A Contribution with the specified Event id',
            data: err.message,
        }
    }
}

export const updateContributionService = async(contributionId:string,body:IAddContributions)=>{
    try {
        const res = validateUpdateContribution(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        const admin = await Admin.findOne({_id:body.adminId})
        if(!admin){
            return {
                status: 500,
                message: 'Admin not found',
                data: null
            }
        }
        const event = await Event.findOne({_id:body.eventId})
        if(!event){
            return {
                status: 500,
                message: 'Event not found',
                data: null
            }
        }
        let singleContribution = await Contribution.findById(contributionId).exec()
        if (!singleContribution) {
            return {
                status: 404,
                message:'Failure',
                data: "No Contribution found",
            }
        }
        let updatedEvent = await Contribution.findOneAndUpdate({_id:contributionId}, body, {
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
                message: 'Failed to get A Contribution with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get A Contribution/Admin/Event with the specified id',
            data: err.message,
        }
    }
}

export const deleteContributionService = async(contributionId: string) =>{
    try {
        let contribution = await Contribution.findById(contributionId).exec()
        if (!contribution) {
            return {
                status: 404,
                message:'Failure',
                data: "No Contribution found",
            }
        }else {
            await Contribution.findOneAndUpdate({_id:contributionId}, {isActive:!contribution.isActive}, {
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
                message: 'Failed to get A Contribution with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get A Contribution with the specified id',
            data: err.message,
        }
    }

}