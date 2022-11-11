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
        let link = `${BASE_URL}/authenticate/${encode}`
        msgBody = `Dear ${email}\nThank You For Patterning And Trusting Us With Your Fund. Your Password Reset Was Initiated Successfully. Please Click On The Link Below To Reset Your Password.\n${link}`
    }
    let msg = <IMailBody>{
        to:email,
        from:process.env.MAIL_SENDER,
        subject:title,
        text:msgBody
    };
    try {
        await mailer.send(msg)
        return true
    } catch (error) {
        console.error(error);
       return false
    }
}