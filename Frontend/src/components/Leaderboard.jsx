import React from "react";
import { FaMedal } from "react-icons/fa";

const medalLabels = ["🥇 1st Place", "🥈 2nd Place", "🥉 3rd Place"];

const podiumConfig = [
  {
    width: 160,
    height: 220,
    translateX: 0,
    zIndex: 20,
    rank: 1,
    gradient:
      "bg-gradient-to-b from-yellow-400 via-yellow-300 to-yellow-500",
    shadow: "shadow-yellow-400/70",
    medalColor: "bg-yellow-500",
    medalHover: "hover:bg-yellow-600",
  },
  {
    width: 130,
    height: 180,
    translateX: -90,
    zIndex: 15,
    rank: 2,
    gradient: "bg-gradient-to-b from-gray-400 via-gray-300 to-gray-500",
    shadow: "shadow-gray-400/70",
    medalColor: "bg-gray-500",
    medalHover: "hover:bg-gray-600",
  },
  {
    width: 110,
    height: 150,
    translateX: 90,
    zIndex: 15,
    rank: 3,
    gradient: "bg-gradient-to-b from-orange-400 via-orange-300 to-orange-500",
    shadow: "shadow-orange-400/70",
    medalColor: "bg-orange-500",
    medalHover: "hover:bg-orange-600",
  },
];

function Leaderboard({ data = [] }) {
  const topThree = data.slice(0, 3);
  const rest = data.slice(3);

  return (
    <div className="mt-6 max-w-5xl mx-auto px-4">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-blue-700 select-none drop-shadow-md">
        🌟 Leaderboard
      </h2>

      {/* Olympic Podium */}
      <div
  className="relative flex justify-center items-end mb-16"
  style={{ height: 260 }}
>
  {[1, 0, 2].map((pos) => {
    const user = topThree[pos];
    const config = podiumConfig[pos];
    if (!user || !config) return null;

    return (
      <div
        key={user.name}
        role="button"
        aria-label={`${user.name} is ranked #${config.rank} with ${
          user.totalPoints ?? 0
        } points`}
        tabIndex={0}
        className={`
          flex flex-col items-center rounded-t-lg cursor-pointer
          transition-transform duration-300 ease-in-out transform
          hover:scale-110 hover:-translate-y-4
          ${config.gradient} ${config.shadow} shadow-lg select-none relative
        `}
        style={{
          width: config.width,
          height: config.height,
          zIndex: config.zIndex,
          transform: `translateX(${config.translateX}px)`,
        }}
        title={`${user.name} — ${user.totalPoints ?? 0} points`}
      >
        {/* Medal with shine animation */}
        <div
          className={`
            absolute -top-14 rounded-full flex items-center justify-center
            w-20 h-20 text-white text-5xl font-extrabold
            shadow-xl
            ${config.medalColor} ${config.medalHover}
            relative overflow-hidden
            animate-bounce-slow hover:animate-bounce-fast
          `}
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          <FaMedal className="relative z-10" />
          {/* Shiny highlight */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-white opacity-20
              rounded-full pointer-events-none animate-shine"
          />
        </div>

        {/* User info */}
        <div className="mt-auto py-3 px-4 text-center">
          <p
            className="font-extrabold text-2xl text-white drop-shadow-md truncate"
            title={user.name}
          >
            {user.name || "—"}
          </p>
          <p className="text-yellow-100 text-sm font-semibold mt-1">
            {user.totalPoints ?? 0} pts
          </p>
          <p className="text-yellow-200 text-xs mt-1">{medalLabels[pos]}</p>
        </div>
      </div>
    );
  })}
</div>

      {/* Remaining Users Table */}
      {rest.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-300">
          <table className="min-w-full border-collapse rounded">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-300 px-5 py-3 text-left font-semibold text-gray-700">
                  Rank
                </th>
                <th className="border border-gray-300 px-5 py-3 text-left font-semibold text-gray-700">
                  User
                </th>
                <th className="border border-gray-300 px-5 py-3 text-left font-semibold text-gray-700">
                  Total Points
                </th>
              </tr>
            </thead>
            <tbody>
              {rest.map((entry, idx) => (
                <tr
                  key={entry.name}
                  className="hover:bg-blue-50 cursor-pointer transition-all duration-300 ease-in-out"
                  title={`${entry.name} — ${entry.totalPoints} points`}
                >
                  <td className="border border-gray-300 px-5 py-3">{entry.rank ?? idx + 4}</td>
                  <td className="border border-gray-300 px-5 py-3">{entry.name}</td>
                  <td className="border border-gray-300 px-5 py-3">{entry.totalPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.length === 0 && (
        <p className="text-center text-gray-500 mt-8 select-none">
          No users found yet.
        </p>
      )}

      {/* Extra styles for shine animation */}
      <style>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) rotate(25deg);
          }
          100% {
            transform: translateX(200%) rotate(25deg);
          }
        }
        .animate-shine {
          animation: shine 2.5s infinite;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-bounce-fast {
          animation: bounce 1.5s infinite;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10%);
          }
        }
      `}</style>
    </div>
  );
}

export default Leaderboard;
