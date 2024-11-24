import express from 'express';
import {
  getAllUsers,
  registerUser,
  deleteUser,
} from "../controller/user.controller.js";



const userRouter = express.Router();


// Use controllers directly as route handlers
userRouter.get("/users", getAllUsers);
userRouter.post("/users", registerUser);
userRouter.delete("/users/:chatId", deleteUser);

export default userRouter;