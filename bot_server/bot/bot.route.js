import { getToken, updateToken } from "./bot.controller";
import express from "express";


const router = express.Router();

router.get('/bot', getToken);
router.put('/bot/:token', updateToken);

export default router;