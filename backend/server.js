import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import predictRoute from "./routes/predict.js";
import leaderboardRoute from "./routes/leaderboard.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173","https://aesthetiq123.vercel.app"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/beauty-battle";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/predict", predictRoute);
app.use("/api/leaderboard", leaderboardRoute);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Beauty Battle API is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});