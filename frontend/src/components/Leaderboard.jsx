import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get("https://aesthetiq-zb4o.onrender.com/api/leaderboard").then((res) => {
      setScores(res.data);
    });
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mt-8 w-96">
      <h2 className="text-xl font-bold mb-4">🏆 Leaderboard</h2>
      <ul className="space-y-2">
        {scores.map((s, i) => (
          <li key={s._id} className="flex justify-between">
            <span>{i + 1}. {s.username}</span>
            <span className="font-bold text-pink-600">{s.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
