import { IAddAdmin, ILoginAdmin, IChangePasswordAdmin, IResetPasswordAdminEmail, IResetPasswordAdminEmailValidate} from "../types/addAdminTypes"
import { validateAdmin,validateAdminLogin, validateAdminChangePassword, validateAdminResetPasswordEmail, validateAdminResetPasswordValidate, validateUpdateAdmin } from "../validate/addAdminValidate"
import jwt from 'jsonwebtoken'
import {sendMail} from "../middlewares/sendMail"
import { Admin } from "../models/admin"
import bcrypt from 'bcrypt'
require('dotenv').config()

const JWT_SECRET:any = process.env.FEDOK_SECRET

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
        const numberExist = await Admin.findOne({phoneNumber})
        if(numberExist){
            return {
                status:400,
                message:'Error',
                data:'PhoneNumber already exists',
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

export const loginAdminService = async function(body: ILoginAdmin){
    try {
        const res = validateAdminLogin(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        const {email, password} = body
        const exist = await Admin.findOne({email}).select("+password").exec()
        if(!exist){
            return {
                status:400,
                message:'Error',
                data:'Admin Email does not exist. Please Check the Email And try again'
            }
        }
        if(exist.isActive === "Deleted"){
            return {
                status:400,
                message:'Error',
                data:'Admin Email does not exist.'
            }
        }
        if(exist.isActive === "Blocked"){
            return {
                status:400,
                message:'Error',
                data:'Admin Email is blocked. Please Contact The Administrator'
            }
        }

        const isMatch = await bcrypt.compare(password, exist.password)
        if(!isMatch){
            return {
                status:400,
                message:'Error',
                data:'Invalid Email or Password'
            }
        }

        let fakepassword:any = undefined
        exist.password = fakepassword

        const token = jwt.sign({id:exist._id}, JWT_SECRET, {expiresIn:'1h'})
        exist.last_login = new Date()
        await exist.save()
        return {
            status: 200,
            message: 'Success',
            userToken:token,
            data:exist
        }

    }catch (err: any) {
        return {
            status: 400,
            message: 'Error',
            data: err.message
        }
    }
}

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

export const updateAdminService = async(adminId:string,body:IAddAdmin)=>{
    try {
        const res = validateUpdateAdmin(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        let admin = await Admin.findById(adminId).exec()
        if (!admin) {
            return {
                status: 404,
                message:'Failure',
                data: "No Admin found",
            }
        }
        let updatedAdmin = await Admin.findOneAndUpdate({_id:adminId}, body, {
            new: true
        });
        return {
            status: 200,
            message:'Success',
            data: updatedAdmin,
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

export const changeAccessService = async(adminId: string, body:IAddAdmin) =>{
    try {
        let admin = await Admin.findById(adminId).exec()
        if (!admin) {
            return {
                status: 404,
                message:'Failure',
                data: "No Admin found",
            }
        }else if(admin.access === 'Super'){
            return {
                status: 400,
                data: "Sorry! A Super Admin Cannot Access",
            }
        }else {
            await Admin.findOneAndUpdate({_id:adminId}, body, {
                new: true
            })
            return {
                status: 200,
                message:'Success', 
                data: "Access Changed",
            }
        }
    }catch (err: any) {
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

export const blockAdminService = async(adminId: string) =>{
    try {
        let admin = await Admin.findById(adminId).exec()
        if (!admin) {
            return {
                status: 404,
                message:'Failure',
                data: "No Admin found",
            }
        }else if(admin.access === 'Super'){
            return {
                status: 400,
                data: "Sorry! A Super Admin Cannot Be Blocked",
            }
        }else {
            if(admin.isActive ==='Active'){
                await Admin.findOneAndUpdate({_id:adminId}, {isActive:"Blocked"}, {
                    new: true
                })
            }else if(admin.isActive ==='Blocked'){
                await Admin.findOneAndUpdate({_id:adminId}, {isActive:"Active"}, {
                    new: true
                })
            }
            return {
                status: 200,
                message:'Success', 
                data: "Operation Executed successfully",
            }
        }
    }catch (err: any) {
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

export const deleteAdminService = async(adminId: string) =>{
    try {
        let admin = await Admin.findById(adminId).exec()
        if (!admin) {
            return {
                status: 404,
                message:'Failure',
                data: "No Admin found",
            }
        }else if(admin.access === 'Super'){
            return {
                status: 400,
                data: "Sorry! A Super Admin Cannot Be Deleted",
            }
        }else {
            if(admin.isActive != "Deleted"){
                await Admin.findOneAndUpdate({_id:adminId}, {isActive:"Deleted"}, {
                    new: true
                })
            }else if(admin.isActive ==='Deleted'){
                await Admin.findOneAndUpdate({_id:adminId}, {isActive:"Active"}, {
                    new: true
                })
            }
            return {
                status: 200,
                message:'Success', 
                data: "Operation Executed successfully",
            }
        }
    }catch (err: any) {
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

export const changePasswordService = async(adminId: string, body:IChangePasswordAdmin)=>{
    try {
        const res = validateAdminChangePassword(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        const { oldPassword, newPassword, confirmPassword} = body
        const exist = await Admin.findById(adminId).select("+password").exec()
        if(!exist){
            return {
                status: 404,
                message:'Failure',
                data: "No Admin found",
            }
        }
        const isMatch = await bcrypt.compare(oldPassword, exist.password);
        if(!isMatch){
            return {
                status: 400,
                message:'Password Not Correct',
            }
        }
        const hashedPassword = await bcrypt.hash(newPassword, +process.env.SALT_ROUNDS!)
        exist.password = hashedPassword
        await exist.save()
        return {
            status: 200,
            message:'Success',
            data: 'Password Changed Successfully',
        }
    }catch (err: any) {
        return {
            status: 400,
            message: 'Error',
            data: err.message
        }
    }
}

export const resetPasswordEmailService = async function(adminId: string, body:IResetPasswordAdminEmail){
    try {
        const res = validateAdminResetPasswordEmail(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        const {email} = body
        const exist = await Admin.findOne({email}).exec()
        if(!exist){
            return {
                status:400,
                message:'Error',
                data:'Admin Email does not exist. Please Check the Email And try again'
            }
        }
        let mailer = await sendMail(email,'reset')
        if(mailer){
            return {
                status: 200,
                message:'Success',
                data: 'Please Check Your Email To Continue Your Reset Password',
            }
        }
        return {
            status: 400,
            message:'Error',
            data: 'Error Sending Mail To Reset Password. Try Again Later.'
        }
    }catch (err: any) {
        return {
            status: 400,
            message: 'Error',
            data: err.message
        }
    }
}

export const resetPasswordEmailValidateService = async function(adminId: string, body:IResetPasswordAdminEmailValidate){
    try {
        const res = validateAdminResetPasswordValidate(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        const {email, newPassword, confirmPassword} = body
        const userEmail = Buffer.from(email,"base64").toString();
        
        const exist = await Admin.findOne({email:userEmail}).select("+password").exec()
        if(!exist){
            return {
                status:400,
                message:'Error',
                data:'Admin Email does not exist. Please Check the Email And try again'
            }
        }

        if(newPassword !== confirmPassword){
            return {
                status:400,
                message:'Error',
                data:'Password Do not match'
            }
        }
        
        const hashedPassword = await bcrypt.hash(newPassword, +process.env.SALT_ROUNDS!)
        exist.password = hashedPassword
        await exist.save()
        return {
            status: 200,
            message:'Success',
            data: 'Password Changed Successfully',
        }
    }catch (err: any) {
        return {
            status: 400,
            message: 'Error',
            data: err.message
        }
    }
}


