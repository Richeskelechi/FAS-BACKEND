import mailer from '@sendgrid/mail'
import 'dotenv/config'
import { IMailBody} from "../types/addAdminTypes"

mailer.setApiKey(process.env.FEDOK_API_KEY!)
const BASE_URL = process.env.BASE_URL

export const sendMail = async(email: string, type:string)=>{
    let msgBody = ""
    let title = ""
    if(type == 'reset'){
        title = 'Password Reset'
        let encode = Buffer.from(email).toString('base64')
        let button = `<br/><br/><center><a href=${BASE_URL}?email=${encode}> Reset Password</a></center>`
        msgBody = `Dear ${email}<br />Thank You For Patterning And Trusting Us With Your Fund. Your Password Reset Was Initiated Successfully. Please Click On The Link Below To Reset Your Password.<br />${button}`
    }
    let msg = <IMailBody>{
        to:email,
        from:process.env.MAIL_SENDER,
        subject:title,
        text:msgBody,
        html:msgBody
    };
    try {
        await mailer.send(msg)
        return true
    } catch (error) {
        console.error(error);
       return false
    }
}

export const sendFunMail = async(funNumber:string,email: string, name:string, type:string)=>{
    let msgBody = ""
    let title = ""
    if(type == 'create'){
        title = 'Create Account'
        let encodeEmail = Buffer.from(email).toString('base64')
        let encodeFunNumber = Buffer.from(funNumber).toString('base64')
        let encodeName = Buffer.from(name).toString('base64')
        let button = `<br/><br/><center><a href=${BASE_URL}/authenticate/?funNumber=${encodeFunNumber}&email=${encodeEmail}&name=${encodeName}> Create Account</a></center>`
        msgBody = `Dear ${name}<br />Thank You For Patterning And Trusting Us With Your Fund. Your Account Creation Link Was Initiated Successfully. Please Click On The Link Below To Create A New Account.<br />${button}`
    }
    let msg = <IMailBody>{
        to:email,
        from:process.env.MAIL_SENDER,
        subject:title,
        text:msgBody,
        html:msgBody
    };
    try {
        await mailer.send(msg)
        return true
    } catch (error) {
        console.error(error);
       return false
    }
}

export const sendComplainMail = async(adminFullname:string,adminEmail: string, eventName:string, userfullname:string, userEmail:string, complaint:string, type:string)=>{
    let adminBody = ""
    let adminTitle = ""
    let userBody = ""
    let userTitle = ""
    if(type == 'create'){
        adminTitle = 'Complain For '+eventName
        userTitle = 'Complain For '+eventName

        adminBody = `Dear ${adminFullname}<br /><br />A Complain was raised by ${userfullname} with respect to ${eventName}.Please Below Is The Complain.<br /><br />${complaint}.<br /><br />Please Login to the Account And try to resolve the complain. <br />Once you have resolved it do mark the complain as done.<br /><br />Thank you.`
        userBody = `Dear ${userfullname}<br /><br />The Complain Form You raised with respect to ${eventName} has being submitted Successfuly.Please Below Is The Complain.<br /><br />${complaint}.<br /><br />Please Do Know that the complain will be attended to and all issues will be resolved. <br />A mail will be sent to you once the issue is resolved.<br /><br />Thank you for your patience.`
    }else{
        adminTitle = 'Complain For '+eventName +' Resolved'
        userTitle = 'Complain For '+eventName + ' Resolved'

        adminBody = `Dear ${adminFullname}<br /><br />The Complain raised by ${userfullname} with respect to ${eventName} Has Been Resolved.<br /><br />Thank You For Taking Your Time To Resolve The Complaint.<br /><br />Thank you.`
        userBody = `Dear ${userfullname}<br /><br />The Complain Form You raised with respect to ${eventName} has being Resolved Successfully.<br /> Please Below Is The Complain You Made.<br /><br />${complaint}.<br /><br />Please Do Login To The Account To See The resolved Complaint.<br /><br />Thank you for your patience.`
    }
    let Adminmsg = <IMailBody>{
        to:adminEmail,
        from:process.env.MAIL_SENDER,
        subject:adminTitle,
        text:adminBody,
        html:adminBody
    };
    let usermsg = <IMailBody>{
        to:userEmail,
        from:process.env.MAIL_SENDER,
        subject:userTitle,
        text:userBody,
        html:userBody
    };
    try {
        await mailer.send(Adminmsg)
        await mailer.send(usermsg)
        return true
    } catch (error) {
        console.error(error);
       return false
    }
}