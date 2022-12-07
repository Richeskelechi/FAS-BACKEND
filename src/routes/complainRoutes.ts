import express from "express";
import {addComplain, singleAdminComplain, singleUserComplain, singleAllAdminComplain, editAdminComplain} from "../controllers/complaintController"
import { verifyUserToken, verifyToken, checkEditorAdmin } from "../middlewares/checkAuth";
const complainRouter = express.Router();

complainRouter.post("/addComplain", verifyUserToken, addComplain);
complainRouter.get("/AdminComplain/:id", verifyToken, singleAdminComplain);
complainRouter.get("/UserComplain/:id", verifyUserToken, singleUserComplain);
complainRouter.get("/AllAdminComplain", verifyToken, checkEditorAdmin, singleAllAdminComplain);
complainRouter.put("/editAdmincomplain/:id", verifyToken, editAdminComplain);

export default complainRouter;