import { IAddAdmin } from "../types/addAdminTypes";
import Joi from "joi"
import JoiDate from "@joi/date";

const joi = Joi.extend(JoiDate);

export const validateAdmin = function(body:IAddAdmin){
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    let errorArr = []
    if(body.fullname == '') errorArr.push("Fullname is required")
    if(body.email == '') errorArr.push("Email is required")
    if(body.phoneNumber == '') errorArr.push("Phone Number is required");
    if(body.access == '') errorArr.push("Admin Access is required");
    const isValidEmail = emailRegex.test(body.email);
    const isValidPassword = passwordRegex.test(body.password)
    if(!isValidEmail) errorArr.push("Email is not A valid Email address")
    if(!isValidPassword) errorArr.push("Password Must Be up to 8 charcters and must contain both letters, numbers and special characters.")
    if(body.password == '') errorArr.push("Password is required")
    if(body.access == '') errorArr.push("Access is required")
    if(errorArr.length > 0){
        return {success:false, data:errorArr}
    }
    return {success:true}
}