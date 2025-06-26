"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "Stats", href: "/dashboard" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "Questions", href: "/questions" },
];

export default function NavTabs() {
  const pathname = usePathname();
  return (
    <nav className="w-full flex justify-center mt-8 mb-8">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 bg-white/70 dark:bg-black/30 rounded-2xl p-2 sm:p-4 shadow-md w-full max-w-xs sm:max-w-none">
        {tabs.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-4 py-3 sm:px-8 sm:py-4 rounded-xl text-lg sm:text-xl font-bold transition-colors duration-200 w-full sm:w-auto text-center
                ${active ? "bg-gradient-to-r from-indigo-700 to-purple-800 text-white shadow-lg" : "text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900"}
              `}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 