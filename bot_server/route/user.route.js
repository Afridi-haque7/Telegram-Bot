import express from 'express';
import {
  getAllUsers,
  registerUser,
  deleteUser,
  updateUser,
} from "../controller/user.controller.js";



const userRouter = express.Router();


// Use controllers directly as route handlers
userRouter.get("/users", getAllUsers);
userRouter.post("/users", registerUser);
userRouter.delete("/users/:chatId", deleteUser);
userRouter.put("/users/:chatId", updateUser);


export default userRouter;