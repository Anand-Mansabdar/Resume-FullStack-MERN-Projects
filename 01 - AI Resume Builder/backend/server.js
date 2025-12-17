// Packages
import express from "express";
import cors from "cors";
import "dotenv/config";

// Modules
import connectDB from "./Config/db.js";
import userRouter from "./routes/auth.routes.js";
import resumeRouter from "./routes/resume.routes.js";

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

app.listen(PORT || 4000, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
