import { ICreateUser, ILoginUser, IChangePasswordUser, IResetPasswordUserEmail, IResetPasswordUserEmailValidate } from "../types/userTypes";

export const validateUser = function(body:ICreateUser){
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    let errorArr = []
    if(body.fullname == '') errorArr.push("Fullname is required")
    if(body.email == '') errorArr.push("Email is required")
    if(body.phoneNumber == '') errorArr.push("Phone Number is required");
    if(body.address == '') errorArr.push("User Address is required");
    if(body.occupation == '') errorArr.push("User Occupation is required");
    if(body.password == '') errorArr.push("Password is required")
    if(body.confirmPassword == '') errorArr.push("Confirm Password is required")
    const isValidEmail = emailRegex.test(body.email);
    const isValidPassword = passwordRegex.test(body.password)
    const isValidConfirmPassword = passwordRegex.test(body.confirmPassword)
    if(!isValidEmail) errorArr.push("Email is not A valid Email address")
    if(!isValidPassword) errorArr.push("Password Must Be up to 8 charcters and must contain both letters, numbers and special characters.")
    if(!isValidConfirmPassword) errorArr.push("Confirmed Password Must Be up to 8 charcters and must contain both letters, numbers and special characters.")
    if(errorArr.length > 0){
        return {success:false, data:errorArr}
    }
    return {success:true}
}

export const validateUserLogin = function(body:ILoginUser){
    
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

export const validateUpdateUser = function(body:ICreateUser){
    let errorArr = []

    if(body.fullname == '')errorArr.push("Fullname is required")
    if(body.email == '') errorArr.push("Email is required")
    if(body.phoneNumber == '') errorArr.push("Phone Number is required");
    if(body.address == '') errorArr.push("User Address is required");
    if(body.occupation == '') errorArr.push("User Occupation is required");
    if(errorArr.length > 0)return {success:false, data:errorArr}
    return {success:true}
}

export const validateUserChangePassword = function(body:IChangePasswordUser){
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

export const validateUserResetPasswordEmail = function(body: IResetPasswordUserEmail){
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

export const validateUserResetPasswordValidate = function(body:IResetPasswordUserEmailValidate){
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