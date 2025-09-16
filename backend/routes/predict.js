import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import fs from "fs";
import FormData from "form-data";
import Score from "../models/Score.js";

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ 
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { username } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }
    
    if (!username || username.trim().length === 0) {
      return res.status(400).json({ error: "Username is required" });
    }

    const filePath = req.file.path;

    // Create form data for ML API
    const formData = new FormData();
    formData.append("image", fs.createReadStream(filePath));

    console.log("🔄 Sending image to ML API...");
    
    // Send to ML API
    const response = await fetch("https://beauty-rate.onrender.com/predict", {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`ML API responded with status: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ ML API response:", result);

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    // Ensure score is within valid range (1-5)
    let score = parseFloat(result.score);
    if (isNaN(score) || score < 1) score = 1;
    if (score > 5) score = 5;

    // Save score to database
    const newScore = new Score({ 
      username: username.trim(), 
      score: score 
    });
    await newScore.save();

    console.log(`💾 Saved score for ${username}: ${score}`);

    res.json({ 
      score: score,
      message: "Prediction successful!" 
    });

  } catch (err) {
    console.error("❌ Prediction error:", err);
    
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      error: "Prediction failed. Please try again!",
      details: err.message 
    });
  }
});

export default router;