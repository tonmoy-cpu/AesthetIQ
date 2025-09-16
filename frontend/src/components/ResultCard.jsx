import React, { useEffect, useState } from "react";
import { Star, Crown, Heart, Sparkles, Trophy } from "lucide-react";
import Confetti from "react-confetti";

export default function ResultCard({ score }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    setShowConfetti(true);
    // Animate score counting up
    const timer = setInterval(() => {
      setAnimatedScore(prev => {
        if (prev < score) {
          return Math.min(prev + 0.1, score);
        }
        clearInterval(timer);
        return score;
      });
    }, 50);

    const confettiTimer = setTimeout(() => setShowConfetti(false), 3000);
    
    return () => {
      clearInterval(timer);
      clearTimeout(confettiTimer);
    };
  }, [score]);

  const getReaction = () => {
    if (score >= 4.5) return {
      text: "👑 ABSOLUTE ROYALTY! You're stunning! 🔥",
      color: "text-yellow-400",
      bgColor: "from-yellow-400 to-orange-500",
      icon: Crown,
      stars: 5
    };
    if (score >= 4.0) return {
      text: "🌟 GORGEOUS! You're absolutely beautiful! ✨",
      color: "text-pink-400",
      bgColor: "from-pink-400 to-purple-500",
      icon: Sparkles,
      stars: 5
    };
    if (score >= 3.5) return {
      text: "😍 STUNNING! Looking absolutely amazing! 💖",
      color: "text-purple-400",
      bgColor: "from-purple-400 to-pink-500",
      icon: Heart,
      stars: 4
    };
    if (score >= 3.0) return {
      text: "🌸 BEAUTIFUL! You have a lovely charm! 🌺",
      color: "text-rose-400",
      bgColor: "from-rose-400 to-pink-400",
      icon: Star,
      stars: 4
    };
    if (score >= 2.5) return {
      text: "😊 PRETTY! You have a sweet appeal! 🌷",
      color: "text-indigo-400",
      bgColor: "from-indigo-400 to-purple-400",
      icon: Heart,
      stars: 3
    };
    if (score >= 2.0) return {
      text: "🙂 NICE! You have your unique beauty! 🌻",
      color: "text-blue-400",
      bgColor: "from-blue-400 to-indigo-400",
      icon: Star,
      stars: 3
    };
    return {
      text: "😄 UNIQUE! Beauty comes in all forms! 🌈",
      color: "text-green-400",
      bgColor: "from-green-400 to-blue-400",
      icon: Trophy,
      stars: 2
    };
  };

  const reaction = getReaction();
  const IconComponent = reaction.icon;

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center max-w-sm mx-auto transform hover:scale-105 transition-all duration-300">
        {/* Animated Icon */}
        <div className={`bg-gradient-to-r ${reaction.bgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow`}>
          <IconComponent className="w-10 h-10 text-white" />
        </div>

        {/* Score Display */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Beauty Score</h2>
          <div className={`text-6xl font-extrabold ${reaction.color} mb-2`}>
            {animatedScore.toFixed(1)}
            <span className="text-2xl text-gray-500">/5.0</span>
          </div>
          
          {/* Star Rating */}
          <div className="flex justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < reaction.stars
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Reaction Text */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 mb-4">
          <p className="text-lg font-semibold text-gray-800">{reaction.text}</p>
        </div>

        {/* Fun Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-blue-50 rounded-xl p-3">
            <p className="font-bold text-blue-600">Confidence</p>
            <p className="text-blue-800">{Math.round(score * 20)}%</p>
          </div>
          <div className="bg-pink-50 rounded-xl p-3">
            <p className="font-bold text-pink-600">Charm Level</p>
            <p className="text-pink-800">{score >= 4 ? "MAX" : "HIGH"}</p>
          </div>
        </div>
      </div>
    </>
  );
}