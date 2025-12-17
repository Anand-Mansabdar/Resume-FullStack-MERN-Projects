import { Router } from "express";
import {
  getUserById,
  getUserResume,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", authMiddleware, getUserById);
userRouter.get("/resumes", authMiddleware, getUserResume);

export default userRouter;
