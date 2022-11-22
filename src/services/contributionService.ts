import { IAddContribution } from "../types/contributionTypes";
import {validateContribution, validateUpdateContribution} from "../validate/contributionValidate"

import { Contribution } from "../models/contribution"
import {Admin} from "../models/admin"

export const addContributionService = async function (body:IAddContribution){
    try {
        const res = validateContribution(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        const {adminId, contributionName, contributionDescription} = body
        const admin = await Admin.findOne({_id:adminId})
        console.log(admin);
        
        if(!admin){
            return {
                status: 500,
                message: 'Admin not found',
                data: null
            }
        }
        const newContribution = new Contribution({
            adminId: adminId,
            contributionName: contributionName,
            contributionDescription: contributionDescription,
        });
        await newContribution.save()
        return {
            status: 201,
            message: 'Success',
            data: newContribution
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

export const getAllContributionService = async() =>{
    try {
        const allContribution = await Contribution.find()
        return {
            status: 200,
            message:'Success',
            data: allContribution,
        }
    } catch (err: any) {
        return {
            status: 500,
            message: 'Failed to get Contribution Data',
            data: err.message,
        }
    }
}

export const getSingleContributionService = async(contributionId:string) =>{
    try {
        let singleContribution = await Contribution.findById(contributionId).exec()
        if (!singleContribution) {
            return {
                status: 404,
                message:'Failure',
                data: "No Contribution found",
            }
        }
        return {
            status: 200,
            message:'Success',
            data: singleContribution,
        }
    } catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get a Contribution with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get a Contribution',
            data: err.message,
        }
    }
}

export const updateContributionService = async(contributionId:string,body:IAddContribution)=>{
    try {
        const res = validateUpdateContribution(body)
        if(res.success === false){
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            }
        }
        let contribution = await Contribution.findById(contributionId).exec()
        if (!contribution) {
            return {
                status: 404,
                message:'Failure',
                data: "No Contribution found",
            }
        }
        let updatedContribution = await Contribution.findOneAndUpdate({_id:contributionId}, body, {
            new: true
        });
        return {
            status: 200,
            message:'Success',
            data: updatedContribution,
        }
    } catch (err: any) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get a Contribution with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get a Contribution',
            data: err.message,
        }
    }
}

export const editContributionStatusService = async(contributionId: string) =>{
    try {
        let contribution = await Contribution.findById(contributionId).exec()
        console.log(contribution);
        
        if (!contribution) {
            return {
                status: 404,
                message:'Failure',
                data: "No Contribution found",
            }
        }else {
            if(contribution.contributionStatus==='Ongoing'){
                await Contribution.findOneAndUpdate({_id:contributionId}, {contributionStatus:"Ended"}, {
                    new: true
                })
            }else if(contribution.contributionStatus==='Ended'){
                await Contribution.findOneAndUpdate({_id:contributionId}, {contributionStatus:"Ongoing"}, {
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
                message: 'Failed to get a Contribution with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get a Contribution with the specified id',
            data: err.message,
        }
    }

}

export const deleteContributionService = async(contributionId: string) =>{
    try {
        let contribution = await Contribution.findById(contributionId).exec()
        if (!contribution) {
            return {
                status: 404,
                message:'Failure',
                data: "No Contribution found",
            }
        }else {
            await Contribution.findOneAndUpdate({_id:contributionId}, {isActive:!contribution.isActive}, {
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