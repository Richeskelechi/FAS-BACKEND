import { IAddContribution } from "../types/contributionTypes";


export const validateContribution = function(body:IAddContribution){
    let errorArr = []
    if(body.adminId == '') errorArr.push("Admin Id is required")
    if(body.contributionName == '') errorArr.push("Contribution Name is required")
    if(body.contributionDescription == '') errorArr.push("Contribution Description is required");
    if(errorArr.length > 0){
        return {success:false, data:errorArr}
    }
    return {success:true}
}
export const validateUpdateContribution = function(body:IAddContribution){
    let errorArr = []

    if(body.contributionName == '')errorArr.push("contribution Name is required")
    if(body.contributionDescription == '')errorArr.push("contribution Description is required")
    if(errorArr.length > 0)return {success:false, data:errorArr}
    return {success:true}
}