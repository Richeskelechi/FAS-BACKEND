import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin";
import { User } from "../models/user";

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.headers.authorization) {
    res.status(401).json({ status: 400, message: "Unauthorized! Please login again." });
    return;
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.FEDOK_SECRET as string) as { id: string };

    const verifiedAdmin = await Admin.findById(decoded.id);

    if (!verifiedAdmin) {
      res.status(403).json({ status: 400, message: "Not Authorized, Invalid Admin" });
      return;
    }

    if (verifiedAdmin.isActive === "Blocked") {
      res.status(403).json({ status: 400, message: "Admin email is blocked. Please contact the administrator." });
      return;
    }

    if (verifiedAdmin.isActive === "Deleted") {
      res.status(403).json({ status: 400, message: "Admin email does not exist." });
      return;
    }

    req.user = verifiedAdmin.id; // Ensure `req.user` type is correctly defined in Express typings

    next(); // Ensure next() is always called

  } catch (error) {
    res.status(401).json({ status: 400, message: "Unauthorized! Please login again." });
  }
};


export const checkSuperAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.headers.authorization) {
    res.status(401).json({ status: 400, message: "Unauthorized! Please login again." });
    return;
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.FEDOK_SECRET as string) as { id: string };

    const verifiedAdmin = await Admin.findById(decoded.id);

    if (!verifiedAdmin) {
      res.status(403).json({ status: 400, message: "Not Authorized, Invalid Admin" });
      return;
    }

    if (verifiedAdmin.access !== "Super") {
      res.status(403).json({ status: 400, message: "Not Authorized to Perform This Action" });
      return;
    }

    console.log("I am authenticated");
    console.log(verifiedAdmin);

    next(); // Ensure next() is always called

  } catch (error) {
    res.status(401).json({ status: 400, message: "Unauthorized! Please login again." });
  }
};

export const checkEditorAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.headers.authorization) {
    res.status(401).json({ status: 400, message: "Unauthorized! Please login again." });
    return;
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.FEDOK_SECRET as string) as { id: string };

    const verifiedAdmin = await Admin.findById(decoded.id);
    if (!verifiedAdmin) {
      res.status(403).json({ status: 400, message: "Not Authorized, Invalid Admin" });
      return;
    }

    if (verifiedAdmin.access === "Reviewer") {
      res.status(403).json({ status: 400, message: "Not Authorized to Perform This Action" });
      return;
    }

    next(); // Ensuring next() is properly called

  } catch (error) {
    res.status(401).json({ status: 400, message: "Unauthorized! Please login again." });
  }
};

export const verifyUserToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.headers.authorization) {
    res.status(401).json({ status: 400, message: "Unauthorized! Please login again." });
    return;
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.FEDOK_SECRET as string) as { id: string };

    const verifiedUser = await User.findById(decoded.id);
    if (!verifiedUser) {
      res.status(403).json({ status: 400, message: "Not Authorized, Invalid Fedok12 User" });
      return;
    }

    if (verifiedUser.isActive === "Blocked") {
      res.status(403).json({ status: 400, message: "User account is blocked. Please contact the administrator." });
      return;
    }

    if (verifiedUser.isActive === "Deleted") {
      res.status(403).json({ status: 400, message: "User account does not exist." });
      return;
    }

    req.user = verifiedUser.id;
    next(); // Ensuring next() is properly called

  } catch (error) {
    res.status(401).json({ status: 400, message: "Unauthorized! Please login again." });
  }
};