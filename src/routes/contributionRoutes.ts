import express from "express";

import {addContribution, allContribution, singleContribution, singleEventContribution, updateContribution, deleteContribution} from "../controllers/contributionController"
import {verifyToken, checkEditorAdmin} from "../middlewares/checkAuth"
const contributionRouter = express.Router();

contributionRouter.post("/addContribution", verifyToken, checkEditorAdmin, addContribution);
contributionRouter.get("/allContribution",verifyToken,  allContribution);
contributionRouter.get("/singleContribution/:contributionId", verifyToken, singleContribution);
contributionRouter.get("/singleEventContribution/:eventId",verifyToken, singleEventContribution);
contributionRouter.put("/editContribution/:contributionId",verifyToken, checkEditorAdmin, updateContribution);
contributionRouter.put("/deleteContribution/:contributionId",verifyToken, checkEditorAdmin, deleteContribution);

export default contributionRouter;