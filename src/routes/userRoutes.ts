import express from "express";
import {validateFunNumber, createUser} from "../controllers/userController"
const userRouter = express.Router();

userRouter.post("/validateFunNumber", validateFunNumber);
userRouter.post("/createUser", createUser);

export default userRouter;