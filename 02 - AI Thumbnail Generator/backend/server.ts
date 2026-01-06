import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";

const app = express();

app.use(express.json());
app.use(cors());
await connectDB();

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
