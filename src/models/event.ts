import { Schema, model } from "mongoose";

import { IAddEvents } from "../types/eventTypes";

const eventSchema = new Schema<IAddEvents>({
    adminId: {
        type: String,
        trim: true,
        required: true,
    },
    eventName: {
        type: String,
        trim: true,
        required: true,
    },
    eventDescription: {
        type: String,
        trim: true,
        required: true,
    },
    eventStatus: {
        type: String,
        required: true,
        default: "Ongoing"
    },
    isActive: {
        type: Boolean,
        required: true,
        default:true
    }
},{timestamps:true})

export const Event = model('Event', eventSchema);  
