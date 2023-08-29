export interface IAddAdmin{
    fullname: string,
    email: string,
    access:string
    password: string,
    confirmPassword: string,
    isActive: string,
    last_login: Date,
    phoneNumber:String,
}

export interface ILoginAdmin{
    email: string,
    password: string,
}
export interface IChangePasswordAdmin{
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}
export interface IResetPasswordAdminEmail{
    email: string,
}

export interface IMailBody{
    to: string,
    from: string,
    subject: string,
    text: string,
}

export interface IResetPasswordAdminEmailValidate{
    email: string,
    newPassword: string,
    confirmPassword: string
}

export interface IAdminAccess{
    access:string
    adminId: string,
}
