import {sendFunMail, sendMail} from "../middlewares/sendMail"
import {Fun} from "../models/funNumber"
import jwt from 'jsonwebtoken'
import { User } from "../models/user"
import { ICreateUser, ILoginUser, IChangePasswordUser, IResetPasswordUserEmail, IResetPasswordUserEmailValidate } from "../types/userTypes"
import { validateUser, validateUserLogin, validateUpdateUser, validateUserChangePassword, validateUserResetPasswordEmail, validateUserResetPasswordValidate } from "../validate/userValidate"
import bcrypt from 'bcrypt'
require('dotenv').config()
const JWT_SECRET:any = process.env.FEDOK_SECRET


export const validateFunNumberService = async(funNumber:string) =>{
    try {
        if(funNumber == ''){
            return {
                status:404,
                message:'Failure',
                data:"Fun Number Is required"
            }
        }
        const funNum = await Fun.findOne({funNumber:funNumber})
        if(!funNum){
            return {
                status: 404,
                message:'Failure',
                data: "No Fun Number found. Please Contact Fedok12 Welfare Team To Get Your Fun Number",
            }
        }
        if(funNum.isValidated){
            return {
                status: 404,
                message:'Failure',
                data: "This Fun Number has already been validated. Please Try To Login",
            }
        }
        let mailer = await sendFunMail(funNum.funNumber,funNum.email,funNum.fullName,'create')
        if(mailer){
            return {
                status: 200,
                message:'Success',
                data: 'Please Check Your Email To Continue Your Account Creation',
            }
        }
    } catch (err: any) {
        return {
            status: 500,
            message: 'Failed to get Fun Number Data',
            data: err.message,
        }
    }
}

export const createUserService = async function (body:ICreateUser){
    try {
        const res = validateUser(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        const {fullname, email, funNumber, phoneNumber, password, address, occupation} = body
        const exist = await User.findOne({email})
        if(exist){
            return {
                status:400,
                message:'Error',
                data:'Email already exists',
            }
        }
        const numberExist = await User.findOne({phoneNumber})
        if(numberExist){
            return {
                status:400,
                message:'Error',
                data:'PhoneNumber already exists',
            }
        }
        const newUser = new User({
            fullname: fullname,
            email: email,
            funNumber:funNumber,
            phoneNumber:phoneNumber,
            password: password,
            address: address,
            occupation: occupation
        });
        const hashedPassword = await bcrypt.hash(newUser.password, +process.env.SALT_ROUNDS!);
        newUser.password = hashedPassword;
        await newUser.save()
        await Fun.findOneAndUpdate({funNumber:funNumber}, {isValidated:true}, {
            new: true
        });
        return {
            status: 201,
            message: 'Success',
            data: newUser
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

export const loginUserService = async function(body: ILoginUser){
    try {
        
        const res = validateUserLogin(body)
        if(res.success === false){
            
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        const {email, password} = body
        const exist = await User.findOne({email}).select("+password +last_login").exec()
        
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
        
        await User.findOneAndUpdate({_id:exist._id}, {last_login :new Date()}, {
            new: true
        })
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

export const getSingleUserService = async(userId:string) =>{
    try {
        let user = await User.findById(userId).exec()
        if (!user) {
            return {
                status: 404,
                message:'Failure',
                data: "No User found",
            }
        }
        return {
            status: 200,
            message:'Success',
            data: user,
        }
    } catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get a User with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get a User',
            data: err.message,
        }
    }
}

export const updateUserService = async(userId:string,body:ICreateUser)=>{
    try {
        const res = validateUpdateUser(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        let user = await User.findById(userId).exec()
        if (!user) {
            return {
                status: 404,
                message:'Failure',
                data: "No User found",
            }
        }
        let updatedUser = await User.findOneAndUpdate({_id:userId}, body, {
            new: true
        });
        return {
            status: 200,
            message:'Success',
            data: updatedUser,
        }
    } catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get a User with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get a User',
            data: err.message,
        }
    }
}

export const changeUserPasswordService = async(adminId: string, body:IChangePasswordUser)=>{
    try {
        const res = validateUserChangePassword(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        const { oldPassword, newPassword} = body
        const exist = await User.findById(adminId).select("+password").exec()
        if(!exist){
            return {
                status: 404,
                message:'Failure',
                data: "No User found",
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

export const resetUserPasswordEmailService = async function(body:IResetPasswordUserEmail){
    try {
        const res = validateUserResetPasswordEmail(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        const {email} = body
        const exist = await User.findOne({email}).exec()
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

export const resetUserPasswordEmailValidateService = async function(body:IResetPasswordUserEmailValidate){
    try {
        const res = validateUserResetPasswordValidate(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        const {email, newPassword, confirmPassword} = body
        const userEmail = Buffer.from(email,"base64").toString();
        
        const exist = await User.findOne({email:userEmail}).select("+password").exec()
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