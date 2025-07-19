import React, { useState } from 'react';
import axios from 'axios';

function UserSelector({ users, setSelectedUser, fetchUsers }) {
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(false);

  const addUser = async () => {
    if (!newUser.trim()) return; // prevent adding empty

    try {
      setLoading(true);
      await axios.post('/api/users', { name: newUser.trim() });
      setNewUser('');
      fetchUsers();
    } catch {
      alert('Failed to add user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addUser();
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <select
        onChange={(e) => setSelectedUser(e.target.value)}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue=""
      >
        <option value="" disabled>
          -- Select User --
        </option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <input
          type="text"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add new user"
          className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          onClick={addUser}
          disabled={loading || !newUser.trim()}
          className={`px-4 py-2 rounded font-semibold text-white transition ${
            loading || !newUser.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>
    </div>
  );
}

export default UserSelector;
