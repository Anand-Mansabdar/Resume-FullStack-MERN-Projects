import { Router } from "express";
import {
  isLoggedIn,
  registerUser,
  userLogin,
  userLogout,
} from "../controllers/auth.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", userLogin);
authRouter.get("/verify", authMiddleware, isLoggedIn);
authRouter.post("/logout", authMiddleware, userLogout);

export default authRouter;
