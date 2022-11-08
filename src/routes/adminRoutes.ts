import express, {Request, Response, NextFunction} from "express";

import {addAdmin, allAdmin, singleAdmin} from "../controllers/adminController"
const adminRouter = express.Router();

adminRouter.post("/addAdmin", addAdmin);
adminRouter.get("/allAdmin", allAdmin);
adminRouter.get("/admin/:id", singleAdmin);

export default adminRouter;