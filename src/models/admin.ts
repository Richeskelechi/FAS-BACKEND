import { Schema, model } from "mongoose";

import { IAddAdmin } from "../types/addAdminTypes";

const adminSchema = new Schema<IAddAdmin>({
    fullname: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select:false,
        trim: true,
        minlength: 8,
    },
    access:{
        type: String,
        trim: true,
        required: true,
    },
    isActive: {
        type: String,
        trim: true,
        default:"Active",
    },
    last_login: {
        type: Date,
        trim: true,
        default: Date.now(),
    }
},{timestamps:true})

export const Admin = model('Admin', adminSchema);  
