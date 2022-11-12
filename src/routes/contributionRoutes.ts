import express from "express";

import {addContribution, allContribution, singleContribution, updateContribution, editStatusContribution, deleteContribution} from "../controllers//contributionController"
import {verifyToken, checkEditorAdmin} from "../middlewares/checkAuth"
const contributionRouter = express.Router();

contributionRouter.post("/addContribution", verifyToken, checkEditorAdmin, addContribution);
contributionRouter.get("/allContribution",verifyToken,  allContribution);
contributionRouter.get("/singleContribution/:id", verifyToken, singleContribution);
contributionRouter.put("/updateContribution/:id",verifyToken, checkEditorAdmin, updateContribution);
contributionRouter.put("/editStatusContribution/:id",verifyToken, checkEditorAdmin, editStatusContribution);
contributionRouter.put("/deleteContribution/:id",verifyToken, checkEditorAdmin, deleteContribution);


export default contributionRouter;