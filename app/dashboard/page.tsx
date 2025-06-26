import React from "react";
import NavTabs from "../components/NavTabs";

const users = ["jormarcus", "kbrien11", "rgnack", "shugums"];
const baseUrl = "https://leetcard.jacoblin.cool/";
const theme = "unicorn";

export default function DashboardPage() {
  return (
    <div className="bebas min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 py-8 px-4">
      <NavTabs />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 w-full max-w-7xl">
        {users.map((user) => (
          <div className="w-full flex justify-center" key={user}>
            <img
              src={`${baseUrl}${user}?theme=${theme}&ext=activity&radius=16&border=3&animation=false&font=bebas_neue`}
              alt={`${user} LeetCode Stats`}
              className="rounded-2xl w-full max-w-xl shadow-lg bg-white/80 dark:bg-black/40"
            />
          </div>
        ))}
      </div>
    </div>
  );
} 