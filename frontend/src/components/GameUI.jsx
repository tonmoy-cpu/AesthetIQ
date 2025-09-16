import React from "react";
import { Trophy, Medal, Award, Star } from "lucide-react";

export default function GameUI({ score }) {
  const getAchievement = () => {
    if (score >= 4.5) return {
      title: "👑 BEAUTY LEGEND",
      subtitle: "You've reached the highest tier!",
      color: "text-yellow-400",
      bgColor: "bg-gradient-to-r from-yellow-400 to-orange-500",
      icon: Trophy,
      level: "LEGENDARY"
    };
    if (score >= 4.0) return {
      title: "🌟 BEAUTY MASTER",
      subtitle: "Outstanding beauty score!",
      color: "text-purple-400",
      bgColor: "bg-gradient-to-r from-purple-400 to-pink-500",
      icon: Medal,
      level: "MASTER"
    };
    if (score >= 3.5) return {
      title: "💎 BEAUTY EXPERT",
      subtitle: "Impressive beauty rating!",
      color: "text-pink-400",
      bgColor: "bg-gradient-to-r from-pink-400 to-purple-400",
      icon: Award,
      level: "EXPERT"
    };
    if (score >= 3.0) return {
      title: "⭐ BEAUTY STAR",
      subtitle: "Great beauty potential!",
      color: "text-blue-400",
      bgColor: "bg-gradient-to-r from-blue-400 to-indigo-400",
      icon: Star,
      level: "STAR"
    };
    return {
      title: "🌈 BEAUTY EXPLORER",
      subtitle: "Every journey starts somewhere!",
      color: "text-green-400",
      bgColor: "bg-gradient-to-r from-green-400 to-blue-400",
      icon: Star,
      level: "EXPLORER"
    };
  };

  const achievement = getAchievement();
  const IconComponent = achievement.icon;

  return (
    <div className="mt-6 space-y-4">
      {/* Achievement Badge */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl">
        <div className={`${achievement.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <h3 className={`text-xl font-bold ${achievement.color} mb-1`}>
          {achievement.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">{achievement.subtitle}</p>
        <div className="bg-gray-100 rounded-full px-4 py-1 inline-block">
          <span className="text-xs font-bold text-gray-700">LEVEL: {achievement.level}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Beauty Progress</span>
          <span className="text-sm font-bold text-purple-600">{Math.round((score / 5) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(score / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Fun Message */}
      <div className="text-center">
        <p className="text-white/90 text-lg font-medium drop-shadow-lg">
          {score >= 4 ? "🎉 Share your amazing score with friends! 🎉" : "💪 Keep glowing and try again! ✨"}
        </p>
      </div>
    </div>
  );
}