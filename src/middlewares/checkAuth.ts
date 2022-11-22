import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin";
import { User } from "../models/user";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      
      const decoded = <any>(jwt.verify(token, process.env.FEDOK_SECRET as string));
      
      const verifiedAdmin = await Admin.findById(decoded.id);
      if(!verifiedAdmin){
        return res.status(403).json({
            status:400,
            message:'Not Authorised, Invalid Admin'
        });
      }
      if (verifiedAdmin?.isActive === "Blocked") {
        return res.status(403).json({
            status:400,
            message:'Admin Email is blocked. Please Contact The Administrator'
        });
      }
      if (verifiedAdmin?.isActive === "Deleted") {
        return res.status(403).json({
            status:400,
            message:'Admin Email does not exist.'
        });
      }
      req.user = verifiedAdmin.id
      return next();
    } catch (error) {
      return res.status(404).json({
        status:400,
        message:'UnAuthorized!. Please Login Again'
    });
    }
  } else {
    return res.status(404).json({
        status:400,
        message:'UnAuthorized!. Please Login Again'
    });
  }
}

export const checkSuperAdmin = async (req: Request, res: Response, next: NextFunction) =>{
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = <any>(jwt.verify(token, process.env.FEDOK_SECRET as string));
          
            const verifiedAdmin = await Admin.findById(decoded.id);
            if(!verifiedAdmin){
                return res.status(403).json({
                    status:400,
                    message:'Not Authorised, Invalid Admin'
                });
            }
            if (verifiedAdmin?.access != "Super") {
                return res.status(403).json({
                    status:400,
                    message:'Not Authorised To Perform This Action'
                });
            }
            return next();
        }catch (error) {
            return res.status(404).json({
                status:400,
                message:'UnAuthorized!. Please Login Again'
            });
        }
    } else {
        return res.status(404).json({
            status:400,
            message:'UnAuthorized!. Please Login Again'
        });
    }
}

export const checkEditorAdmin = async (req: Request, res: Response, next: NextFunction) =>{
  if (req.headers.authorization) {
      try {
          const token = req.headers.authorization.split(" ")[1];
          const decoded = <any>(jwt.verify(token, process.env.FEDOK_SECRET as string));
        
          const verifiedAdmin = await Admin.findById(decoded.id);
          if(!verifiedAdmin){
              return res.status(403).json({
                  status:400,
                  message:'Not Authorised, Invalid Admin'
              });
          }
          if (verifiedAdmin?.access === "Reviewer") {
              return res.status(403).json({
                  status:400,
                  message:'Not Authorised To Perform This Action'
              });
          }
          return next();
      }catch (error) {
          return res.status(404).json({
              status:400,
              message:'UnAuthorized!. Please Login Again'
          });
      }
  } else {
      return res.status(404).json({
          status:400,
          message:'UnAuthorized!. Please Login Again'
      });
  }
}

export const verifyUserToken = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split(" ")[1];
        
        const decoded = <any>(jwt.verify(token, process.env.FEDOK_SECRET as string));
        
        const verifiedUser = await User.findById(decoded.id);
        if(!verifiedUser){
          return res.status(403).json({
              status:400,
              message:'Not Authorised, Invalid Fedok12 User'
          });
        }
        if (verifiedUser?.isActive === "Blocked") {
          return res.status(403).json({
              status:400,
              message:'Admin Email is blocked. Please Contact The Administrator'
          });
        }
        if (verifiedUser?.isActive === "Deleted") {
          return res.status(403).json({
              status:400,
              message:'Admin Email does not exist.'
          });
        }
        req.user = verifiedUser.id
        return next();
      } catch (error) {
        return res.status(404).json({
          status:400,
          message:'UnAuthorized!. Please Login Again'
      });
      }
    } else {
      return res.status(404).json({
          status:400,
          message:'UnAuthorized!. Please Login Again'
      });
    }
  }