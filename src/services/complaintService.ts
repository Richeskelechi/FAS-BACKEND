import { IComplaintForm } from "../types/complaintTypes";
import { validateComplaint } from "../validate/complainValidate"
import { sendComplainMail } from "../middlewares/sendMail"

import { Event } from "../models/event"
import {Admin} from "../models/admin"
import {User} from "../models/user";
import { Complaint } from "../models/complaint"

export const addComplaintService = async function (body:IComplaintForm){
    try {
        const res = validateComplaint(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        const {adminId, eventId, userId, complaint} = body
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
        const user = await User.findOne({_id:userId})
        if(!user){
            return {
                status: 500,
                message: 'User not found',
                data: null
            }
        }
        
        const newComplain = new Complaint({
            adminId: adminId,
            adminName: admin.fullname,
            adminEmail: admin.email,
            eventName: event.eventName,
            contributorId: userId,
            contributorName: user.fullname,
            contributorEmail: user.email,
            complaint: complaint
        });
        await newComplain.save()
        let mailer = await sendComplainMail(admin.fullname, admin.email, event.eventName, user.fullname, user.email, complaint, "create")
        if(mailer){
            return {
                status: 200,
                message:'Success',
                data: 'Your Complain Has Been Created. Please Check Your Mail For Further Details',
            }
        }else{
            return {
                status: 200,
                message:'Success',
                data: 'Your Complain Has Been Created. Thank You!',
            }
        }
    }catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Admin/Event/User with the specified id Does Not Exist',
            }
        }
        return {
            status: 500,
            message: 'Error Adding An Complaint',
        }
    }
}

export const getSingleAdminComplaintService = async(adminId:string) =>{
    try {
        let complaint = await Complaint.find({adminId:adminId})
        if (!complaint) {
            return {
                status: 404,
                message:'Failure',
                data: "No Complaint found For This Admin",
            }
        }
        return {
            status: 200,
            message:'Success',
            data: complaint,
        }
    } catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get A Complaint with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get A Complaint with the specified id',
            data: err.message,
        }
    }
}

export const getSingleUserComplaintService = async(contributorId:string) =>{
    try {
        let singleComplaint = await Complaint.find({contributorId:contributorId})
        if (!singleComplaint) {
            return {
                status: 404,
                message:'Failure',
                data: "No Complaint found For This Admin",
            }
        }
        return {
            status: 200,
            message:'Success',
            data: singleComplaint,
        }
    } catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get A Complaint with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get A Complaint with the specified id',
            data: err.message,
        }
    }
}

export const getAllAdminComplaintService = async() =>{
    try {
        let singleComplaint = await Complaint.find()
        if (!singleComplaint) {
            return {
                status: 404,
                message:'Failure',
                data: "No Complaint found For This Admin",
            }
        }
        return {
            status: 200,
            message:'Success',
            data: singleComplaint,
        }
    } catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get A Complaint with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get A Complaint with the specified id',
            data: err.message,
        }
    }
}

export const editAdminComplainService = async(complainId: string) =>{
    try {
        let singleComplain = await Complaint.findById(complainId).exec()
        console.log(singleComplain);
        if (!singleComplain) {
            return {
                status: 404,
                message:'Failure',
                data: "No Complaint found",
            }
        }else {
            await Complaint.findOneAndUpdate({_id:complainId}, {resolved:true}, {
                new: true
            })
            let mailer = await sendComplainMail(singleComplain.adminName, singleComplain.adminEmail, singleComplain.eventName, singleComplain.contributorName, singleComplain.contributorEmail, singleComplain.complaint, "resolved")
            if(mailer){
                return {
                    status: 200,
                    message:'Success',
                    data: 'The Complain Has Been Resolved Successfuly. Thank You',
                }
            }else{
                return {
                    status: 200,
                    message:'Success',
                    data: 'The Complain Has Been Resolved Successfuly. Thank You',
                }
            }
        }
    }catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get A Complait with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get A Complait with the specified id',
            data: err.message,
        }
    }

}