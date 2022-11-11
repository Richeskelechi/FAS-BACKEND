import { IAddAdmin, ILoginAdmin, IChangePasswordAdmin, IResetPasswordAdminEmail, IResetPasswordAdminEmailValidate } from "../types/addAdminTypes";
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
    const isValidConfirmPassword = passwordRegex.test(body.confirmPassword)
    if(!isValidEmail) errorArr.push("Email is not A valid Email address")
    if(!isValidPassword) errorArr.push("Password Must Be up to 8 charcters and must contain both letters, numbers and special characters.")
    if(!isValidConfirmPassword) errorArr.push("Confirmed Password Must Be up to 8 charcters and must contain both letters, numbers and special characters.")
    if(body.password == '') errorArr.push("Password is required")
    if(body.confirmPassword == '') errorArr.push("Confirm Password is required")
    if(body.access == '') errorArr.push("Access is required")
    if(errorArr.length > 0){
        return {success:false, data:errorArr}
    }
    return {success:true}
}

export const validateAdminLogin = function(body:ILoginAdmin){
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    let errorArr = []
    if(body.email == '') errorArr.push("Email is required")
    if(body.password == '') errorArr.push("Password is required")
    const isValidEmail = emailRegex.test(body.email);
    const isValidPassword = passwordRegex.test(body.password)
    if(!isValidEmail) errorArr.push("Email is not A valid Email address")
    if(!isValidPassword) errorArr.push("Password Must Be up to 8 charcters and must contain both letters, numbers and special characters.")

    if(errorArr.length > 0){
        return {success:false, data:errorArr}
    }
    return {success:true}
}

export const validateAdminChangePassword = function(body:IChangePasswordAdmin){
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    let errorArr = []

    if(body.oldPassword == '') errorArr.push("Old Password is required")
    if(body.newPassword == '') errorArr.push("New Password is required")
    if(body.confirmPassword == '') errorArr.push("Confirm Password is required")

    const isValidOldPassword = passwordRegex.test(body.oldPassword)
    const isValidNewPassword = passwordRegex.test(body.newPassword)
    const isValidConfirmPassword = passwordRegex.test(body.confirmPassword)

    if(!isValidOldPassword) errorArr.push("Old Password Must Be up to 8 charcters and must contain both letters, numbers and special characters.")
    if(!isValidNewPassword) errorArr.push("New Password Must Be up to 8 charcters and must contain both letters, numbers and special characters.")
    if(!isValidConfirmPassword) errorArr.push("Confirm Password Must Be up to 8 charcters and must contain both letters, numbers and special characters.")

    if(body.newPassword != body.confirmPassword) errorArr.push("Password must match")

    if(errorArr.length > 0){
        return {success:false, data:errorArr}
    }
    return {success:true}
}

export const validateAdminResetPasswordEmail = function(body: IResetPasswordAdminEmail){
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    let errorArr = []
    if(body.email == '') errorArr.push("Email is required")
    const isValidEmail = emailRegex.test(body.email);
    if(!isValidEmail) errorArr.push("Email is not A valid Email address")

    if(errorArr.length > 0){
        return {success:false, data:errorArr}
    }
    return {success:true}
}

export const validateAdminResetPasswordValidate = function(body:IResetPasswordAdminEmailValidate){
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    let errorArr = []

    if(body.email == '') errorArr.push("Email is required")
    if(body.newPassword == '') errorArr.push("New Password is required")
    if(body.confirmPassword == '') errorArr.push("Confirm Password is required")

    const isValidNewPassword = passwordRegex.test(body.newPassword)
    const isValidConfirmPassword = passwordRegex.test(body.confirmPassword)

    if(!isValidNewPassword) errorArr.push("New Password Must Be up to 8 charcters and must contain both letters, numbers and special characters.")
    if(!isValidConfirmPassword) errorArr.push("Confirm Password Must Be up to 8 charcters and must contain both letters, numbers and special characters.")

    if(body.newPassword != body.confirmPassword) errorArr.push("Password must match")

    if(errorArr.length > 0){
        return {success:false, data:errorArr}
    }
    return {success:true}
}