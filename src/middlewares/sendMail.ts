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
        let button = `<br/><br/><center><a href=${BASE_URL}/authenticate/?email=${encode}> Reset Password</a></center>`
        msgBody = `Dear ${email}\nThank You For Patterning And Trusting Us With Your Fund. Your Password Reset Was Initiated Successfully. Please Click On The Link Below To Reset Your Password.\n${button}`
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

export const sendFunMail = async(email: string, name:string, type:string)=>{
    let msgBody = ""
    let title = ""
    if(type == 'create'){
        title = 'Create Account'
        let encodeEmail = Buffer.from(email).toString('base64')
        let encodeName = Buffer.from(name).toString('base64')
        let button = `<br/><br/><center><a href=${BASE_URL}/authenticate/?email=${encodeEmail}&name=${encodeName}> Create Account</a></center>`
        msgBody = `Dear ${name}\nThank You For Patterning And Trusting Us With Your Fund. Your Account Creation Link Was Initiated Successfully. Please Click On The Link Below To Create A New Account.\n${button}`
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