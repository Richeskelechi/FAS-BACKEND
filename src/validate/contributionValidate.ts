import { IAddContributions } from "../types/contributionTypes";

export const validateContribution = function(body:IAddContributions){
    let errorArr = []
    if(body.adminId == '') errorArr.push("Admin Id is required")
    if(body.eventId == '') errorArr.push("Event Id is required")
    if(body.contributorName == '') errorArr.push("Contributor's Name is required")
    if(body.contributionAmount < 0) errorArr.push("Contribution Amount Must be greater than zero");
    if(errorArr.length > 0){
        return {success:false, data:errorArr}
    }
    return {success:true}
}

export const validateUpdateContribution = function(body:IAddContributions){
    let errorArr = []
    if(body.adminId == '') errorArr.push("Admin Id is required")
    if(body.eventId == '') errorArr.push("Event Id is required")
    if(body.contributorName == '')errorArr.push("contributor's Name is required")
    if(body.contributionAmount < 0) errorArr.push("Contribution Amount Must be greater than zero");
    if(errorArr.length > 0)return {success:false, data:errorArr}
    return {success:true}
}