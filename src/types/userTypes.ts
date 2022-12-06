export interface ICreateUser{
    fullname: string,
    email: string,
    funNumber: string,
    password: string,
    confirmPassword: string,
    isActive: string,
    last_login: Date,
    phoneNumber:String,
    address:string,
    occupation:string
}

export interface ILoginUser{
    email: string,
    password: string,
}

export interface IChangePasswordUser{
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}

export interface IResetPasswordUserEmail{
    email: string,
}

export interface IMailBodyUser{
    to: string,
    from: string,
    subject: string,
    text: string,
}

export interface IResetPasswordUserEmailValidate{
    email: string,
    newPassword: string,
    confirmPassword: string
}