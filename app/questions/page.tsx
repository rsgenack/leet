"use client";
import React from "react";
import NavTabs from "../components/NavTabs";
import { useQuestionsData } from "../components/QuestionsDataProvider";

const users = ["jormarcus", "kbrien11", "rgnack", "shugums"];

function getStatusBadge(status) {
  if (!status) return <span className="status-badge other">–</span>;
  const s = status.toLowerCase();
  if (s === "accepted") return <span className="status-badge accepted text-[#02b701]">✅ Accepted</span>;
  if (s === "wrong answer") return <span className="status-badge wrong text-[#ec0001]">❌ Wrong</span>;
  if (s === "compile error") return <span className="status-badge compile text-[#ffc803]">⚠️ Compile Error</span>;
  if (s === "time limit exceeded") return <span className="status-badge tle text-[#8f1313]">⏰ Time Limit Exceeded</span>;
  if (s === "memory limit exceeded") return <span className="status-badge mle text-[#555555]">💾 Memory Limit Exceeded</span>;
  if (s === "runtime error") return <span className="status-badge re text-[#ffd400]">⚡ Runtime Error</span>;
  if (s === "presentation error") return <span className="status-badge pe text-[#3a3938]">🖊 Presentation Error</span>;
  if (s === "output limit exceeded") return <span className="status-badge ole text-[#a0b1c4]">📏 Output Limit Exceeded</span>;
  if (s === "system error") return <span className="status-badge se text-[#d12604]">🛑 System Error</span>;
  return <span className="status-badge other text-[#64748b]">{status}</span>;
}

export default function QuestionsPage() {
  const { data: questions, loading, error } = useQuestionsData();

  const sortedQuestions = [...questions].sort(
    (a, b) => Number(a.frontendQuestionId) - Number(b.frontendQuestionId)
  );

  return (
    <div className="bebas min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 py-8 px-4">
      <NavTabs />
      <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full max-w-7xl">
        {loading ? (
          <div className="text-center py-8 col-span-full">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8 col-span-full">{error}</div>
        ) : (
          sortedQuestions.map((q) => (
            <div className="card relative flex flex-col justify-between w-full max-w-md min-w-[280px] rounded-2xl shadow-lg border-4 [border-color:#4c47e6] p-4 overflow-hidden bg-transparent" key={q.titleSlug}>
              <div className="absolute inset-0 bg-white/80 pointer-events-none z-0 rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-purple-200/30 dark:from-blue-900/30 dark:to-purple-900/30 pointer-events-none z-0 rounded-2xl" />
              <div className="card-content text-left relative z-10">
                <div className="card-title font-bold text-3xl mb-1 flex flex-col">
                  <span className="question-number text-2xl text-gray-700">{q.frontendQuestionId}</span>
                  <span className="question-name text-4xl text-gray-900 dark:text-gray-100">{q.title}</span>
                </div>
                <div className={`card-subtitle mb-3 ${q.difficulty.toLowerCase()}`}>{q.difficulty}</div>
                <ul className="results-list mt-4">
                  {users.map((user) => (
                    <li key={user} className="flex items-center gap-2 py-2 text-xl leading-relaxed">
                      <strong className="text-2xl">{user}:</strong> {getStatusBadge(q[user])}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer flex justify-end items-end pt-4">
                <a
                  className="question-link text-blue-600 font-bold hover:underline"
                  href={`https://leetcode.com/problems/${q.titleSlug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </div>
            </div>
          ))
        )}
      </div>
      <style jsx>{`
        .card-subtitle.easy { color: #00b894; }
        .card-subtitle.medium { color: #fdcb6e; }
        .card-subtitle.hard { color: #d63031; }
        .status-badge.accepted { background-color: #16a34a; color: #fff; }
        .status-badge.wrong { background-color: #dc2626; color: #fff; }
        .status-badge.compile { background-color: #6366f1; color: #fff; }
        .status-badge.tle { background-color: #6d28d9; color: #fff; }
        .status-badge.mle { background-color: #0ea5e9; color: #fff; }
        .status-badge.re { background-color: #facc15; color: #222; }
        .status-badge.pe { background-color: #10b981; color: #fff; }
        .status-badge.ole { background-color: #e11d48; color: #fff; }
        .status-badge.se { background-color: #a3a3a3; color: #222; }
        .status-badge.other { background-color: #64748b; color: #fff; }
        .status-badge {
          display: inline-block;
          padding: 0.3em 1em;
          border-radius: 999px;
          font-size: 1em;
          font-weight: 700;
          margin-left: 0.5em;
        }
      `}</style>
    </div>
  );
} 