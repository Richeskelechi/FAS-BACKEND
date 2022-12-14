import { Schema, model } from "mongoose";

import { IAddContributions } from "../types/contributionTypes";

const contributionSchema = new Schema<IAddContributions>({
    adminId: {
        type: String,
        trim: true,
        required: true,
    },
    eventId: {
        type: String,
        trim: true,
        required: true,
    },
    contributorName: {
        type: String,
        trim: true,
        required: true,
    },
    contributionAmount: {
        type: Number,
        trim: true,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    }
},{timestamps:true})

export const Contribution = model('Contribution', contributionSchema);  
