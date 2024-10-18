import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';

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
  const [currentPage, setCurrentPage] = useState(1);  // Pagination state
  const [rowsPerPage] = useState(8);  // Rows per page
  const navigate = useNavigate();

  const fetchGameHistory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate('/');
        return;
      }

      const response = await axios.get("https://lucky-card-backend.onrender.com/api/super-admin/game-history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedData = response.data.data.games || [];
      setGameHistoryData(fetchedData);
    } catch (err) {
      setError("Failed to load game history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate('/');
    } else {
      fetchGameHistory();
    }
  }, [navigate]);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = gameHistoryData.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
<div className="flex items-center justify-center bg-gray-200">
      <div className="max-w-7xl h-[91vh]  p-6  rounded-lg ">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Game History</h1>

        <div className="border border-gray-300 shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase">ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase">Admin ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase">Tickets Sold</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase">Winning Amount</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase">Cards</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRows.length > 0 ? (
                currentRows.map((game) => {
                  const ticketsSold = game.Bets.map(bet => bet.ticketsID).join(", ");
                  const winningAmount = game.Bets.reduce((total, bet) => {
                    return total + bet.card.reduce((acc, card) => acc + card.Amount, 0);
                  }, 0);

                  const cardIcons = game.Bets.flatMap(bet =>
                    bet.card.map(card => cardNumbers[card.cardNo] || card.cardNo)
                  ).join(", ");

                  return (
                    <tr key={game._id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{game._id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{game.Bets.length > 0 ? game.Bets[0].adminID : 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{new Date(game.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{ticketsSold}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{winningAmount}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{cardIcons || 'No Cards'}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">No game history available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: Math.ceil(gameHistoryData.length / rowsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default GameHistory;
