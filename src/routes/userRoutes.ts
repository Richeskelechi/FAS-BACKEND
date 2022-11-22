import express from "express";
import {validateFunNumber, createUser, loginUser, singleUser, updateUser, changePasswordUser, resetUserPasswordEmailAdmin, resetUserPasswordEmailValidateAdmin} from "../controllers/userController"
import { verifyUserToken } from "../middlewares/checkAuth";
const userRouter = express.Router();

userRouter.post("/validateFunNumber", validateFunNumber);
userRouter.post("/createUser", createUser);
userRouter.post("/loginUser", loginUser);
userRouter.get("/singleUser/:id", verifyUserToken, singleUser);
userRouter.put("/updateUser/:id", verifyUserToken, updateUser);
userRouter.put("/changePasswordUser/:id", verifyUserToken, changePasswordUser);
userRouter.post("/resetUserPassword", resetUserPasswordEmailAdmin);
userRouter.post("/resetUserPasswordVerify", resetUserPasswordEmailValidateAdmin);

export default userRouter;