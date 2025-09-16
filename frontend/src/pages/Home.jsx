import React, { useState } from "react";
import { Camera, Sparkles, Trophy, Star } from "lucide-react";
import UploadBox from "../components/UploadBox";
import ResultCard from "../components/ResultCard";
import GameUI from "../components/GameUI";

export default function Home() {
  const [score, setScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-white opacity-10 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/2 -right-8 w-96 h-96 bg-yellow-300 opacity-10 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-10 left-1/4 w-48 h-48 bg-pink-300 opacity-20 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-12 h-12 text-yellow-300 animate-wiggle mr-2" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-2xl">
              AesthetIQ
            </h1>
            <Sparkles className="w-12 h-12 text-yellow-300 animate-wiggle ml-2" />
          </div>
          <p className="text-xl text-white/90 drop-shadow-lg font-medium">
            🎭 Discover the quality 🌟
          </p>
        </div>

        {/* Game Stats */}
        <div className="flex space-x-6 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <Camera className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white font-bold">Upload Photo</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <Star className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
            <p className="text-white font-bold">Get Score</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-white font-bold">Have Fun!</p>
          </div>
        </div>

        {/* Upload Section */}
        <UploadBox setScore={setScore} isLoading={isLoading} setIsLoading={setIsLoading} />

        {/* Results */}
        {score !== null && (
          <div className="mt-8 space-y-6">
            <ResultCard score={score} />
            <GameUI score={score} />
          </div>
        )}

        {/* Fun Footer */}
        <div className="mt-12 text-center">
          <p className="text-white/80 text-sm">
            ✨ Made with love for beauty enthusiasts ✨
          </p>
        </div>
      </div>
    </div>
  );
}