
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

// Mapping of card numbers to icons or names
const cardNumbers = {
    'A001': 'Jheart',
    'A002': 'Jspade',
    'A003': 'Jdiamond',
    'A004': 'Jclub',
    'A005': 'Qheart',
    'A006': 'Qspade',
    'A007': 'Qdiamond',
    'A008': 'Qclub',
    'A009': 'Kheart',
    'A010': 'Kspade',
    'A011': 'Kdiamond',
    'A012': 'Kclub'
};

const GameHistory = () => {
  const [gameHistoryData, setGameHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch game history data from the backend
  const fetchGameHistory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "https://lucky-card-backend.onrender.com/api/super-admin/game-history", 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Game History Response:", response.data); // Log the entire response

      // Access the games array from the response data
      const fetchedData = response.data.data.games || []; // Default to empty array if games is undefined
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

      <div className="max-w-8xl h-[91vh] mx-auto p-6  rounded-lg shadow-lg bg-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Game History</h1>

        {/* Add the hide-scrollbar class here */}
        <div className="border-b border-gray-200 shadow-md rounded-lg overflow-auto w-[1150px] hide-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tickets Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Winning Amount
                </th>   
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cards
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(gameHistoryData) && gameHistoryData.length > 0 ? (
                gameHistoryData.map((game) => {
                  console.log("Rendering Game:", game); // Log each game being rendered

                  // Extracting the Bets data and mapping it to a string or value
                  const ticketsSold = game.Bets.map(
                    (bet) => bet.ticketsID
                  ).join(", "); // Join ticket IDs into a string

                  // Calculate winning amount by summing the Amount from cards in Bets
                  const winningAmount = game.Bets.reduce((total, bet) => {
                    return total + bet.card.reduce((acc, card) => acc + card.Amount, 0);
                  }, 0); // Summing the Amount for each bet's cards

                  // Create a list of card icons
                  const cardIcons = game.Bets.flatMap(bet =>
                    bet.card.map(card => cardNumbers[card.cardNo] || card.cardNo)
                  ).join(", "); // Join card icons into a string

                  return (
                    <tr key={game._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {game._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {game.Bets.length > 0 ? game.Bets[0].adminID : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(game.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ticketsSold}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {winningAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {cardIcons || 'No Cards'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
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

