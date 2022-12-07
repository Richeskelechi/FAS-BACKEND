import { IAddEvents } from "../types/eventTypes";


export const validateEvent = function(body:IAddEvents){
    let errorArr = []
    if(body.adminId == '') errorArr.push("Admin Id is required")
    if(body.eventName == '') errorArr.push("Contribution Name is required")
    if(body.eventDescription == '') errorArr.push("Contribution Description is required");
    if(errorArr.length > 0){
        return {success:false, data:errorArr}
    }
    return {success:true}
}

export const validateUpdateEvent = function(body:IAddEvents){
    let errorArr = []

    if(body.eventName == '')errorArr.push("contribution Name is required")
    if(body.eventDescription == '')errorArr.push("contribution Description is required")
    if(errorArr.length > 0)return {success:false, data:errorArr}
    return {success:true}
}