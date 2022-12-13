import { IAddFunNumber } from "../types/funNumberTypes";
import {validateFunNumber} from "../validate/funNumberValidate"

import { Admin } from "../models/admin"
import {Fun} from "../models/funNumber"

export const addFunNumberService = async function (body:IAddFunNumber){
    try {
        const res = validateFunNumber(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        const {adminId, funNumber, fullName, email} = body
        const admin = await Admin.findOne({_id:adminId})
        
        if(!admin){
            return {
                status: 500,
                message: 'Admin not found',
                data: null
            }
        }

        const funExist = await Fun.findOne({funNumber:funNumber})
        if(funExist){
            return {
                status: 500,
                message: 'Fun Number already exists',
                data: null
            }
        }
        
        const newFunNumber = new Fun({
            adminId: adminId,
            funNumber: funNumber,
            fullName: fullName,
            email:email
        });
        await newFunNumber.save()
        return {
            status: 201,
            message: 'Success',
            data: newFunNumber
        }
    }catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Admin with the specified id Does Not Exist',
            }
        }
        return {
            status: 500,
            message: 'Failed to get an Admin',
        }
    }
}

export const getAllFunNumbersService = async() =>{
    try {
        const funNumbers = await Fun.find()
        return {
            status: 200,
            message:'Success',
            data: funNumbers,
        }
    } catch (err: any) {
        return {
            status: 500,
            message: 'Failed to get Fun Number Data',
            data: err.message,
        }
    }
}

export const getSingleFunNumberByIDService = async(funNumberId:string) =>{
    try {
        let funNumber = await Fun.findById(funNumberId).exec()
        if (!funNumber) {
            return {
                status: 404,
                message:'Failure',
                data: "No Fun Number found",
            }
        }
        return {
            status: 200,
            message:'Success',
            data: funNumber,
        }
    } catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get a Fun Number with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get a Fun Number',
            data: err.message,
        }
    }
}

export const getSingleFunNumberService = async(funNumber:string) =>{
    try {
        const funNum = await Fun.findOne({funNumber:funNumber})
        if(!funNum){
            return {
                status: 404,
                message:'Failure',
                data: "No Fun Number found",
            }
        }
        return {
            status: 200,
            message:'Success',
            data: funNum,
        }
    } catch (err: any) {
        return {
            status: 500,
            message: 'Failed to get Fun Number Data',
            data: err.message,
        }
    }
}

export const updateFunNumberService = async(funNumberId:string,body:IAddFunNumber)=>{
    try {
        const res = validateFunNumber(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        let funDetails = await Fun.findById(funNumberId).exec()
        if (!funDetails) {
            return {
                status: 404,
                message:'Failure',
                data: "No Contribution found",
            }
        }
        let updatedFunDetails = await Fun.findOneAndUpdate({_id:funNumberId}, body, {
            new: true
        });
        return {
            status: 200,
            message:'Success',
            data: updatedFunDetails,
        }
    } catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get a Fun Details with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get a Fun Details',
            data: err.message,
        }
    }
}

export const deleteFunNumberService = async(funNumberId: string) =>{
    try {
        let funDetails = await Fun.findById(funNumberId).exec()
        if (!funDetails) {
            return {
                status: 404,
                message:'Failure',
                data: "No Fun Details found",
            }
        }else {
            await Fun.findOneAndUpdate({_id:funNumberId}, {isActive:!funDetails.isActive}, {
                new: true
            })
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
                message: 'Failed to get an Fun Details with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get an Fun Details',
            data: err.message,
        }
    }

}