import { IAddAdmin} from "../types/addAdminTypes"
import { validateAdmin } from "../validate/addAdminValidate"
import { Admin } from "../models/admin"
import bcrypt from 'bcrypt'
require('dotenv').config()

export const getAllAdminService = async() =>{
    try {
        const admin = await Admin.find()
        return {
            status: 200,
            message:'Success',
            data: admin,
        }
    } catch (err: any) {
        return {
            status: 500,
            message: 'Failed to get admin Data',
            data: err.message,
        }
    }
}

export const getSingleAdminService = async(adminId:string) =>{
    try {
        let admin = await Admin.findById(adminId).exec()
        if (!admin) {
            return {
                status: 404,
                message:'Failure',
                data: "No Admin found",
            }
        }
        return {
            status: 200,
            message:'Success',
            data: admin,
        }
    } catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get an Admin with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get an Admin',
            data: err.message,
        }
    }
}

export const addAdminService = async function (body:IAddAdmin){
    try {
        const res = validateAdmin(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        const {fullname, email, access, phoneNumber, password} = body
        const exist = await Admin.findOne({email})
        if(exist){
            return {
                status:400,
                message:'Error',
                data:'Email already exists',
            }
        }
        const newAdmin = new Admin({
            fullname: fullname,
            email: email,
            access: access,
            phoneNumber:phoneNumber,
            password: password
        });
        const hashedPassword = await bcrypt.hash(newAdmin.password, +process.env.SALT_ROUNDS!);
        newAdmin.password = hashedPassword;
        await newAdmin.save()
        return {
            status: 201,
            message: 'Success',
            data: newAdmin
        }
    }
    catch (err: any) {
        return {
            status: 400,
            message: 'Error',
            data: err.message
        }
    }
}

