import { ICreateUser } from "../types/userTypes";


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