import express from "express";

import {getServerHealth} from "../controllers/serverController"

const serverRouter = express.Router();

serverRouter.get("/", getServerHealth);


export default serverRouter;