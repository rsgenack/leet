"use client";
import React from "react";
import NavTabs from "../components/NavTabs";
import { useQuestionsData } from "../components/QuestionsDataProvider";

const users = ["jormarcus", "kbrien11", "rgnack", "shugums"];

function getStats(questions) {
  return users.map((user) => {
    let easy = 0,
      medium = 0,
      hard = 0;
    questions.forEach((q) => {
      if (q[user] && q[user].toLowerCase() === "accepted") {
        if (q.difficulty === "Easy") easy++;
        else if (q.difficulty === "Medium") medium++;
        else if (q.difficulty === "Hard") hard++;
      }
    });
    return {
      user,
      easy,
      medium,
      hard,
      total: easy + medium + hard,
    };
  });
}

export default function LeaderboardPage() {
  const { data: questions, loading, error } = useQuestionsData();

  const stats = getStats(questions).sort((a, b) => b.total - a.total);

  return (
    <div className="bebas min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 py-8 px-4">
      <NavTabs />
      <div className="w-full max-w-4xl mt-8">
        {/* Mobile Card Layout */}
        <div className="sm:hidden flex flex-col gap-4">
          {stats.map((stat, idx) => (
            <div key={stat.user} className="rounded-2xl border-4 [border-color:#4c47e6] shadow-lg bg-gradient-to-br from-blue-100 to-purple-200 dark:from-blue-900 dark:to-purple-900 p-4 w-full">
              <div className="flex items-center justify-between mb-2" style={{ fontFamily: 'Bebas Neue', fontWeight: 700, fontStyle: 'normal', fontSize: '36px' }}>
                <span className="font-bold text-indigo-600">#{idx + 1}</span>
                <span>{stat.user}</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-between" style={{ fontFamily: 'Bebas Neue', fontWeight: 700, fontStyle: 'normal', fontSize: '36px' }}>
                <span className="text-green-500 font-bold">Easy: {stat.easy}</span>
                <span className="text-yellow-500 font-bold">Medium: {stat.medium}</span>
                <span className="text-red-500 font-bold">Hard: {stat.hard}</span>
                <span className="font-bold">Total: {stat.total}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop Table Layout */}
        <div className="hidden sm:block rounded-2xl border-4 [border-color:#4c47e6] shadow-lg bg-gradient-to-br from-blue-100 to-purple-200 dark:from-blue-900 dark:to-purple-900 p-4 overflow-x-auto">
          <div className="relative z-10">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-8">{error}</div>
            ) : (
              <table className="w-full border-collapse text-left leaderboard-table min-w-[600px]" style={{ fontFamily: 'Bebas Neue', fontWeight: 700, fontStyle: 'normal', fontSize: '36px' }}>
                <thead>
                  <tr>
                    <th className="rank px-4 py-2" style={{ fontSize: '36px' }}>#</th>
                    <th className="px-4 py-2" style={{ fontSize: '36px' }}>User</th>
                    <th className="easy px-4 py-2 text-green-500" style={{ fontSize: '36px' }}>Easy</th>
                    <th className="medium px-4 py-2 text-yellow-500" style={{ fontSize: '36px' }}>Medium</th>
                    <th className="hard px-4 py-2 text-red-500" style={{ fontSize: '36px' }}>Hard</th>
                    <th className="px-4 py-2" style={{ fontSize: '36px' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((stat, idx) => (
                    <tr key={stat.user} className="border-b last:border-0">
                      <td className="rank px-4 py-2 font-bold text-indigo-600" style={{ fontSize: '36px' }}>#{idx + 1}</td>
                      <td className="px-4 py-2" style={{ fontSize: '36px' }}>{stat.user}</td>
                      <td className="easy px-4 py-2 text-green-500 font-bold" style={{ fontSize: '36px' }}>{stat.easy}</td>
                      <td className="medium px-4 py-2 text-yellow-500 font-bold" style={{ fontSize: '36px' }}>{stat.medium}</td>
                      <td className="hard px-4 py-2 text-red-500 font-bold" style={{ fontSize: '36px' }}>{stat.hard}</td>
                      <td className="px-4 py-2 font-bold" style={{ fontSize: '36px' }}>{stat.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 