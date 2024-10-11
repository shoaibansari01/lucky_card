import React from 'react';
import Navbar from './Navbar';

const DataAdmin = () => {
  const gameData = [
    { id: 1, gameName: 'Game 1', ticketsSold: 150, winnings: '₹5000' },
    { id: 2, gameName: 'Game 2', ticketsSold: 250, winnings: '₹12000' },
    { id: 3, gameName: 'Game 3', ticketsSold: 100, winnings: '₹3000' },
  ];

  return (
    <>
        <Navbar/>
    
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Data</h1>
      
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Game Data</h2>
      <div className="overflow-hidden border-b border-gray-200 shadow-md rounded-lg mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets Sold</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winning</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {gameData.map((game) => (
              <tr key={game.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.gameName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.ticketsSold}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.winnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mb-4">Ticket Details</h2>
      <div className="overflow-hidden border-b border-gray-200 shadow-md rounded-lg mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Sample Ticket Data */}
            {gameData.map((game, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{`TICKET-${index + 1}`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.gameName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{Math.floor(Math.random() * 100) + 50}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sold</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mb-4">Winning Information</h2>
      <div className="overflow-hidden border-b border-gray-200 shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winning ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winning Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {gameData.map((game) => (
              <tr key={game.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{`WIN-${game.id}`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.gameName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.winnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default DataAdmin;
