import express from "express";

import {addFunNumber, allFunNumber, singleFunNumberByID, singleFunNumber, updateFunNumber, deleteFunNumber} from "../controllers/funNumberController"
import {verifyToken, checkEditorAdmin} from "../middlewares/checkAuth"
const funNumberRouter = express.Router();

funNumberRouter.post("/addFunNumber", verifyToken, checkEditorAdmin, addFunNumber);
funNumberRouter.get("/allFunNumbers",verifyToken,  allFunNumber);
funNumberRouter.get("/singleFunNumberId/:id", verifyToken, singleFunNumberByID);
funNumberRouter.get("/singleFunNumber", verifyToken, singleFunNumber);
funNumberRouter.put("/updateFunNumber/:id",verifyToken, checkEditorAdmin, updateFunNumber);
funNumberRouter.put("/deleteFunNumber/:id",verifyToken, checkEditorAdmin, deleteFunNumber);


export default funNumberRouter;