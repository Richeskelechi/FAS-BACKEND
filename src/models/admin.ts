import { Schema, model } from "mongoose";

import { IAddAdmin } from "../types/addAdminTypes";

const adminSchema = new Schema<IAddAdmin>({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    access:{
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default:true,
    },
    last_login: {
        type: Date,
        default: Date.now(),
    }
},{timestamps:true})

export const Admin = model('Admin', adminSchema);  
