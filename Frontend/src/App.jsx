import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserSelector from './components/UserSelector';
import Leaderboard from './components/Leaderboard';
import ClaimButton from './components/ClaimButton';

// Base URL for backend API
const API_BASE = 'http://localhost:5000';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [points, setPoints] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/users`);
      setUsers(res.data);
      if (!selectedUser && res.data.length > 0) {
        setSelectedUser(res.data[0]._id);
      }
    } catch  {
      setError('Failed to fetch users');
    }
  };

  // Fetch leaderboard
  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/leaderboard`);
      setLeaderboard(res.data);
    } catch  {
      setError('Failed to fetch leaderboard');
    }
  };

  // Claim points for selected user
  const handleClaim = async () => {
    if (!selectedUser) {
      alert('Please select a user!');
      return;
    }

    setClaiming(true);
    try {
      const res = await axios.post(`${API_BASE}/api/claim`, {
        userId: selectedUser,
      });
      setPoints(res.data.pointsAwarded);

      await Promise.all([fetchUsers(), fetchLeaderboard()]);

      setTimeout(() => setPoints(null), 3000);
    } catch (err) {
      console.error(err);
      alert('Error claiming points');
    } finally {
      setClaiming(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-20">
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-600">
        🏆 Live Leaderboard
      </h1>

      {error && (
        <div className="max-w-2xl mx-auto mb-4 text-red-600 font-semibold">
          {error}
        </div>
      )}

      {/* User Selection and Claim */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-10 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Select a User</h2>

        <UserSelector
          users={users}
          setSelectedUser={setSelectedUser}
          fetchUsers={fetchUsers}
        />

        <div className="mt-4">
          <ClaimButton onClaim={handleClaim} disabled={!selectedUser || claiming} />
        </div>

        {points !== null && (
          <p className="mt-4 text-blue-500 text-lg font-medium">
            🎉 {points} Points Awarded!
          </p>
        )}
      </div>

      {/* Leaderboard */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
        <Leaderboard data={leaderboard} />
      </div>
    </div>
  );
}

export default App;
