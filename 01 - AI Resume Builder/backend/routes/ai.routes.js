import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  uploadResume,
  enhanceJobDescription,
  enhanceProfessionalSummary,
} from "../controllers/ai.controller.js";

const aiRouter = Router();

aiRouter.post(
  "/enhance-professional-summary",
  authMiddleware,
  enhanceProfessionalSummary
);

aiRouter.post(
  "/enhance-job-description",
  authMiddleware,
  enhanceJobDescription
);

aiRouter.post("/upload-resume", authMiddleware, uploadResume);

export default aiRouter;
