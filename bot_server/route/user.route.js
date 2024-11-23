import express from 'express';
import {
  getAllUsers,
  registerUser,
  deleteUser,
} from "../controller/user.controller.js";



const router = express.Router();


// Use controllers directly as route handlers
router.get("/users", getAllUsers);
router.post("/users", registerUser);
router.delete("/users/:chatId", deleteUser);

export default router;