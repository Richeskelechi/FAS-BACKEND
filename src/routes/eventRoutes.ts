import express from "express";

import {addEvent, allEvent, singleEvent, updateEvent, editStatusEvent, deleteEvent} from "../controllers/eventController"
import {verifyToken, checkEditorAdmin} from "../middlewares/checkAuth"
const eventRouter = express.Router();

eventRouter.post("/addEvent", verifyToken, checkEditorAdmin, addEvent);
eventRouter.get("/allEvent",verifyToken,  allEvent);
eventRouter.get("/singleEvent/:id", verifyToken, singleEvent);
eventRouter.put("/updateEvent/:id",verifyToken, checkEditorAdmin, updateEvent);
eventRouter.put("/editStatusEvent/:id",verifyToken, checkEditorAdmin, editStatusEvent);
eventRouter.put("/deleteEvent/:id",verifyToken, checkEditorAdmin, deleteEvent);


export default eventRouter;