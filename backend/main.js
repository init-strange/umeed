import express from "express";
import cors from "cors";
import "dotenv/config";

import connectdb from "./configs/db.js";
import geminiRoutes from "./routes/gemini.js";
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/questions.js";

const app = express();

await connectdb();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ API is working properly");
});

app.use("/api/users", userRoutes);
app.use("/api/ai", geminiRoutes);
app.use("/questions", questionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
