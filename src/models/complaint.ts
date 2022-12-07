import { Schema, model } from "mongoose";

import { IComplaint } from "../types/complaintTypes";

const complainSchema = new Schema<IComplaint>({
    adminId: {
        type: String,
        trim: true,
        required: true,
    },
    adminName: {
        type: String,
        trim: true,
        required: true,
    },
    adminEmail: {
        type: String,
        trim: true,
        required: true,
    },
    eventName: {
        type: String,
        trim: true,
        required: true,
    },
    contributorId: {
        type: String,
        trim: true,
        required: true,
    },
    contributorName: {
        type: String,
        required: true,
        trim: true,
    },
    contributorEmail:{
        type: String,
        trim: true,
        required: true,
    },
    complaint: {
        type: String,
        trim: true,
        required:true,
    },
    resolved: {
        type: Boolean,
        trim: true,
        default: false,
    }
},{timestamps:true})

export const Complaint = model('Complaint', complainSchema);  
