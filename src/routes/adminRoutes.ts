import express from "express";

import {addAdmin, loginAdmin, allAdmin, singleAdmin, updateAdmin, changeAccess, blockAdmin, deleteAdmin, changePasswordAdmin, resetPasswordEmailAdmin, resetPasswordEmailValidateAdmin} from "../controllers/adminController"
import {verifyToken, checkSuperAdmin} from "../middlewares/checkAuth"
const adminRouter = express.Router();

adminRouter.post("/addAdmin", verifyToken, checkSuperAdmin, addAdmin);
adminRouter.post("/loginAdmin", loginAdmin);
adminRouter.get("/allAdmin",verifyToken, checkSuperAdmin, allAdmin);
adminRouter.get("/admin/:id", verifyToken, singleAdmin);
adminRouter.put("/updateAdmin/:id",verifyToken, updateAdmin);
adminRouter.put("/changeAccess/:id",verifyToken, checkSuperAdmin, changeAccess);
adminRouter.put("/blockAdmin/:id",verifyToken, checkSuperAdmin, blockAdmin);
adminRouter.put("/deleteAdmin/:id",verifyToken, checkSuperAdmin, deleteAdmin);
adminRouter.post("/changePasswordAdmin/:id",verifyToken, changePasswordAdmin);
adminRouter.post("/resetPassword/:id",verifyToken, resetPasswordEmailAdmin);
adminRouter.post("/resetPasswordVerify/:id",verifyToken, resetPasswordEmailValidateAdmin);

export default adminRouter;