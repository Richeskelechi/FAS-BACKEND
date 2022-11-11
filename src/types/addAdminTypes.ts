import {Request} from 'express'
export interface IAddAdmin{
    fullname: string,
    email: string,
    access:string
    password: string,
    isActive: string,
    last_login: Date,
    phoneNumber:String,
}

export interface ILoginAdmin{
    email: string,
    password: string,
}
