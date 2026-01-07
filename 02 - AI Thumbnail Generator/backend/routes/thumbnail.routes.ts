import { Router } from "express";
import {
  deleteThumbnail,
  generateThumbnail,
} from "../controllers/thumbnail.controller.js";

const thumbnailRouter = Router();

thumbnailRouter.post("/generate", generateThumbnail);
thumbnailRouter.delete("/delete/:id", deleteThumbnail);

export default thumbnailRouter;
