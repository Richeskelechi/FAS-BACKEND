import express from "express";
import {validateFunNumber, createUser, loginUser} from "../controllers/userController"
const userRouter = express.Router();

userRouter.post("/validateFunNumber", validateFunNumber);
userRouter.post("/createUser", createUser);
userRouter.post("/loginUser", loginUser);

export default userRouter;