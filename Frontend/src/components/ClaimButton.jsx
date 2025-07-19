import React, { useState } from 'react';

function ClaimButton({ onClaim, disabled }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading || disabled) return;

    try {
      setLoading(true);
      await onClaim(); // <-- This comes from App.jsx
    } catch {
      alert('Failed to claim points. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={`px-5 py-2 rounded font-semibold text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
        disabled || loading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-green-600 hover:bg-green-700'
      }`}
    >
      {loading ? 'Claiming...' : 'Claim'}
    </button>
  );
}

export default ClaimButton;
