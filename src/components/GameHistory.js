import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const GameHistory = () => {
  const [gameHistoryData, setGameHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch game history data from the backend
  const fetchGameHistory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("https://lucky-card-backend.onrender.com/api/super-admin/game-history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Game History Response:", response.data); // Log the entire response

      // Assuming your data is in response.data.data
      const fetchedData = response.data.data || []; // Default to empty array if data is undefined
      console.log("Fetched Data:", fetchedData); // Log the fetched data
      setGameHistoryData(fetchedData);
    } catch (err) {
      console.error("Error fetching game history:", err);
      setError("Failed to load game history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameHistory();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />

      <div className="max-w-3xl h-[91vh] mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Game History</h1>

        <div className="overflow-hidden border-b border-gray-200 shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets Sold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winning Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(gameHistoryData) && gameHistoryData.length > 0 ? (
                gameHistoryData.map((game) => (
                  <tr key={game.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.GameId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.Bets}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.winningAmount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No game history available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default GameHistory;
