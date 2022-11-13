import { IAddFunNumber } from "../types/funNumberTypes";


export const validateFunNumber = function(body:IAddFunNumber){
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    let errorArr = []
    if(body.adminId == '') errorArr.push("Admin Id is required")
    if(body.email == '') errorArr.push("Email is required")
    if(body.funNumber == '') errorArr.push("FUN Number is required")
    if(body.fullName == '') errorArr.push("User Fullname is required");
    const isValidEmail = emailRegex.test(body.email);
    if(body.email){
        if(!isValidEmail) errorArr.push("Email is not A valid Email address")
    }
    if(errorArr.length > 0){
        return {success:false, data:errorArr}
    }
    return {success:true}
}