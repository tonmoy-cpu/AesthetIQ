import React, { useEffect, useState } from "react";
import { Users, TrendingUp, Eye, Calendar, Star, Trophy, ArrowLeft } from "lucide-react";
import axios from "axios";

export default function AdminDashboard() {
  const [scores, setScores] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    averageScore: 0,
    highestScore: 0,
    todayUploads: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/leaderboard");
      const allScores = res.data;
      setScores(allScores);

      // Calculate stats
      const total = allScores.length;
      const average = total > 0 ? allScores.reduce((sum, s) => sum + s.score, 0) / total : 0;
      const highest = total > 0 ? Math.max(...allScores.map(s => s.score)) : 0;
      const today = new Date().toDateString();
      const todayCount = allScores.filter(s => 
        new Date(s.createdAt).toDateString() === today
      ).length;

      setStats({
        totalUsers: total,
        averageScore: average,
        highestScore: highest,
        todayUploads: todayCount
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 4.5) return "text-yellow-500";
    if (score >= 4.0) return "text-purple-500";
    if (score >= 3.5) return "text-pink-500";
    if (score >= 3.0) return "text-blue-500";
    return "text-green-500";
  };

  const getScoreBadge = (score) => {
    if (score >= 4.5) return { text: "LEGEND", color: "bg-yellow-500" };
    if (score >= 4.0) return { text: "MASTER", color: "bg-purple-500" };
    if (score >= 3.5) return { text: "EXPERT", color: "bg-pink-500" };
    if (score >= 3.0) return { text: "STAR", color: "bg-blue-500" };
    return { text: "EXPLORER", color: "bg-green-500" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-300">Beauty Battle Analytics & Leaderboard</p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Game</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Average Score</p>
                <p className="text-3xl font-bold text-white">{stats.averageScore.toFixed(1)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Highest Score</p>
                <p className="text-3xl font-bold text-white">{stats.highestScore.toFixed(1)}</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Today's Uploads</p>
                <p className="text-3xl font-bold text-white">{stats.todayUploads}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Complete Leaderboard</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Username</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Level</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {scores.map((score, index) => {
                  const badge = getScoreBadge(score.score);
                  return (
                    <tr key={score._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {index < 3 && (
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                            } text-white`}>
                              {index + 1}
                            </div>
                          )}
                          {index >= 3 && (
                            <span className="text-gray-300 font-medium">{index + 1}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                              {score.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-white font-medium">{score.username}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Star className={`w-4 h-4 ${getScoreColor(score.score)}`} />
                          <span className={`text-xl font-bold ${getScoreColor(score.score)}`}>
                            {score.score.toFixed(1)}
                          </span>
                          <span className="text-gray-400">/5.0</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`${badge.color} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                          {badge.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300 text-sm">
                        {new Date(score.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {scores.length === 0 && (
            <div className="p-12 text-center">
              <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No data available yet</p>
              <p className="text-gray-500 text-sm">Users will appear here after uploading photos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}