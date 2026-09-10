import express from "express";
import "dotenv/config";
import cors from "cors";
import connectdb from "./configs/db.js";
import userRoutes from "./routes/users.js";

const app = express();

await connectdb();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ API is working properly");
});

// User routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
