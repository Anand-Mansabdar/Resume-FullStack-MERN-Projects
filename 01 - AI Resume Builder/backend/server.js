import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./Config/db.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
await connectDB();


app.get("/", (req, res) => {
  res.send("App running");
});

app.listen(PORT || 4000, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
