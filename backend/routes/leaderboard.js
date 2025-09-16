import express from "express";
import Score from "../models/Score.js";

const router = express.Router();

// Get all scores (for admin dashboard)
router.get("/", async (req, res) => {
  try {
    const allScores = await Score.find()
      .sort({ score: -1, createdAt: -1 })
      .lean();
    
    console.log(`📊 Fetched ${allScores.length} scores for leaderboard`);
    res.json(allScores);
  } catch (err) {
    console.error("❌ Leaderboard fetch error:", err);
    res.status(500).json({ error: "Failed to fetch leaderboard data" });
  }
});

// Get top scores only (for public leaderboard if needed)
router.get("/top", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const topScores = await Score.find()
      .sort({ score: -1, createdAt: -1 })
      .limit(limit)
      .lean();
    
    console.log(`🏆 Fetched top ${topScores.length} scores`);
    res.json(topScores);
  } catch (err) {
    console.error("❌ Top scores fetch error:", err);
    res.status(500).json({ error: "Failed to fetch top scores" });
  }
});

// Get user's personal scores
router.get("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const userScores = await Score.find({ username })
      .sort({ createdAt: -1 })
      .lean();
    
    console.log(`👤 Fetched ${userScores.length} scores for user: ${username}`);
    res.json(userScores);
  } catch (err) {
    console.error("❌ User scores fetch error:", err);
    res.status(500).json({ error: "Failed to fetch user scores" });
  }
});

export default router;