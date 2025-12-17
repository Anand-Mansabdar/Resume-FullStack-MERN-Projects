import { Router } from "express";
import {
  createResume,
  deleteResume,
  getPublicResumeById,
  getResumeById,
  updateResume,
} from "../controllers/resume.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../Config/multer.js";

const resumeRouter = Router();

resumeRouter.post("/create", authMiddleware, createResume);
resumeRouter.put(
  "/update",
  upload.single("image"),
  authMiddleware,
  updateResume
);
resumeRouter.delete("/delete/:resumeId", authMiddleware, deleteResume);
resumeRouter.get("/get/:resumeId", authMiddleware, getResumeById);
resumeRouter.get("/public/:resumeId", getPublicResumeById);

export default resumeRouter;
