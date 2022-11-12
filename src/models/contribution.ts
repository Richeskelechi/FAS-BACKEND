import { Schema, model } from "mongoose";

import { IAddContribution } from "../types/contributionTypes";

const contributionSchema = new Schema<IAddContribution>({
    adminId: {
        type: String,
        trim: true,
        required: true,
    },
    contributionName: {
        type: String,
        trim: true,
        required: true,
    },
    contributionDescription: {
        type: String,
        trim: true,
        required: true,
    },
    contributionStatus: {
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

export const Contribution = model('Contribution', contributionSchema);  
