import express from "express";
import "dotenv/config";
import cors from "cors";
import connectdb from "./configs/db.js";
import geminiRoutes from "./routes/gemini.js"; // 1. Import new Gemini route
import userRoutes from "./routes/users.js";

const app = express();

await connectdb();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ API is working properly");
});

app.use("/api/users", userRoutes);

app.use("/api/ai", geminiRoutes); // 2. Register route

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
