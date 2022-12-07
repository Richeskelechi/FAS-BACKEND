export interface IComplaint{
    adminId: string;
    adminName: string,
    adminEmail: string,
    eventName: string,
    contributorId: string,
    contributorName:string,
    contributorEmail:string,
    complaint:string,
    resolved: boolean,
}

export interface IComplaintForm{
    adminId:string,
    eventId:string,
    userId:string,
    complaint:string
}