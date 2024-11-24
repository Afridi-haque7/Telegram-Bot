import { getToken, updateToken } from "./bot.controller.js";
import express from "express";


const botRouter = express.Router();

botRouter.get("/", getToken);
botRouter.put("/:token", updateToken);

export default botRouter;