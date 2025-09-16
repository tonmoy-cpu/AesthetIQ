import React, { useState } from "react";
import { Upload, Camera, Loader, Sparkles } from "lucide-react";
import axios from "axios";

export default function UploadBox({ setScore, isLoading, setIsLoading }) {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !username.trim()) {
      alert("Please enter your name and upload an image! 📸");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("username", username.trim());

      const res = await axios.post("http://localhost:5001/api/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setScore(res.data.score);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Oops! Something went wrong. Please try again! 😅");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/30 shadow-2xl">
      <div className="space-y-6">
        {/* Username Input */}
        <div>
          <label className="block text-white font-semibold mb-2 text-lg">
            ✨ What's your name?
          </label>
          <input
            type="text"
            placeholder="Enter your awesome name"
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/50 transition-all"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* File Upload Area */}
        <div>
          <label className="block text-white font-semibold mb-2 text-lg">
            📸 Upload your photo
          </label>
          <div
            className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
              dragActive
                ? "border-yellow-300 bg-yellow-300/10"
                : "border-white/40 hover:border-white/60 hover:bg-white/5"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
              className="hidden"
              disabled={isLoading}
            />
            
            {preview ? (
              <div className="space-y-3">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full mx-auto border-4 border-white/50"
                />
                <p className="text-white/80">Looking great! Ready to predict? 🌟</p>
              </div>
            ) : (
              <div className="space-y-3">
                <Camera className="w-12 h-12 text-white/60 mx-auto" />
                <div>
                  <p className="text-white font-medium">Drop your photo here</p>
                  <p className="text-white/60 text-sm">or click to browse</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={isLoading || !file || !username.trim()}
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
            isLoading || !file || !username.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:scale-105 shadow-lg hover:shadow-xl"
          } text-white flex items-center justify-center space-x-2`}
        >
          {isLoading ? (
            <>
              <Loader className="w-6 h-6 animate-spin" />
              <span>Analyzing your beauty... ✨</span>
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              <span>Predict My Beauty Score! 🎭</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}