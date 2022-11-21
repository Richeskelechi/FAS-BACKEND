import { Schema, model } from "mongoose";

import { ICreateUser } from "../types/userTypes";

const userSchema = new Schema<ICreateUser>({
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
    address:{
        type: String,
        trim: true,
        required: true,
    },
    occupation: {
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
        select:false,
        trim: true,
        default: Date.now(),
    }
},{timestamps:true})

export const User = model('User', userSchema);  
