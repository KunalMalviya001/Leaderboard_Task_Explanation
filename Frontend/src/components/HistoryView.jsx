import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HistoryView() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/history'); // Adjust endpoint if needed
      setHistory(res.data);
    } catch  {
      setError('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-4 text-blue-600">
        Loading history...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Claim Points History</h2>
      {history.length === 0 ? (
        <p className="text-center text-gray-500">No claim history available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">User</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Points Awarded</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry) => (
                <tr
                  key={entry._id}
                  className="hover:bg-blue-50 transition-colors cursor-default"
                >
                  <td className="border border-gray-300 px-4 py-2">{entry.userName || 'Unknown'}</td>
                  <td className="border border-gray-300 px-4 py-2">{entry.pointsAwarded}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(entry.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HistoryView;
