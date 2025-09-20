import React, { useState } from "react";
import axios from "axios";

function Stats({ stats, setStats }) {
  const [shortId, setShortId] = useState("");

  const handleStats = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/url/stats/${shortId}`
      );
      setStats(res.data);
    } catch (err) {
      alert("Invalid Short ID");
    }
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleStats} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Short ID"
          value={shortId}
          onChange={(e) => setShortId(e.target.value)}
          className="p-2 rounded text-black w-64"
        />
        <button className="bg-green-400 text-black px-4 py-2 rounded hover:bg-green-500">
          Get Stats
        </button>
      </form>

      {stats && (
        <div className="mt-4 bg-white text-black p-4 rounded">
          <p><b>Original URL:</b> {stats.originalUrl}</p>
          <p><b>Visits:</b> {stats.visitCount}</p>
          <p><b>Created At:</b> {new Date(stats.createdAt).toLocaleString()}</p>
          <p><b>Expires At:</b> {new Date(stats.expiresAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default Stats;
