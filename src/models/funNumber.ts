import { Schema, model } from "mongoose";

import { IAddFunNumber } from "../types/funNumberTypes";

const funNumberSchema = new Schema<IAddFunNumber>({
    adminId: {
        type: String,
        trim: true,
        required: true,
    },
    funNumber: {
        type: String,
        trim: true,
        required: true,
        unique: true,

    },
    fullName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    isActive: {
        type: Boolean,
        required: true,
        default:true
    }
},{timestamps:true})

export const Fun = model('Fun', funNumberSchema);  
