import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 50
  },
  score: { 
    type: Number, 
    required: true,
    min: 1,
    max: 5
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

// Index for better query performance
scoreSchema.index({ score: -1, createdAt: -1 });
scoreSchema.index({ username: 1, createdAt: -1 });

export default mongoose.model("Score", scoreSchema);