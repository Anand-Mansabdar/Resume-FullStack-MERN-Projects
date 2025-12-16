import { Router } from "express";
import {
  getUserById,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", authMiddleware, getUserById);

export default userRouter;
