import React from 'react';
import Navbar from './Navbar';

const GameHistory = () => {
  const gameHistoryData = [
    { id: 1, gameId: 'GAME-001', date: '2024-10-01', ticketsSold: 150, winningAmount: '₹5000' },
    { id: 2, gameId: 'GAME-002', date: '2024-10-05', ticketsSold: 250, winningAmount: '₹12000' },
    { id: 3, gameId: 'GAME-003', date: '2024-10-10', ticketsSold: 100, winningAmount: '₹3000' },
  ];

  return (
    <>
        <Navbar/>

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
            {gameHistoryData.map((game) => (
              <tr key={game.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.gameId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.ticketsSold}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.winningAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default GameHistory;
