// Packages
import "dotenv/config";
import express from "express";
import cors from "cors";

// Modules
import connectDB from "./Config/db.js";
import userRouter from "./routes/auth.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import aiRouter from "./routes/ai.routes.js";

// Variables
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());
await connectDB();

// App Routes
app.get("/", (req, res) => {
  res.send("App running");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

app.listen(PORT || 4000, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
