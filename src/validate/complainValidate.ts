import { IComplaintForm } from "../types/complaintTypes";

export const validateComplaint = function(body:IComplaintForm){
    let errorArr = []
    if(body.adminId == '') errorArr.push("Admin Id is required")
    if(body.eventId == '') errorArr.push("Event Id is required")
    if(body.userId =='') errorArr.push("UserId is required")
    if(body.complaint == '') errorArr.push("Complaints is required");
    if(errorArr.length > 0){
        return {success:false, data:errorArr}
    }
    return {success:true}
}