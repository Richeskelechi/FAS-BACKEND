import {sendFunMail} from "../middlewares/sendMail"
import {Fun} from "../models/funNumber"
import { User } from "../models/user"
import { ICreateUser } from "../types/userTypes"
import { validateUser } from "../validate/userValidate"
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
        let mailer = await sendFunMail(funNum.email,funNum.fullName,'create')
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
        const {fullname, email, phoneNumber, password, address, occupation} = body
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
            phoneNumber:phoneNumber,
            password: password,
            address: address,
            occupation: occupation
        });
        const hashedPassword = await bcrypt.hash(newUser.password, +process.env.SALT_ROUNDS!);
        newUser.password = hashedPassword;
        await newUser.save()
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