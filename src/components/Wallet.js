import React, { useState } from 'react';
import Navbar from './Navbar';

const Wallet = () => {
  const [amount, setAmount] = useState('');
  const [history, setHistory] = useState([]);

  const handleAddMoney = (e) => {
    e.preventDefault();
    if (amount) {
      setHistory([...history, { id: history.length + 1, amount: parseFloat(amount), date: new Date().toLocaleString() }]);
      setAmount('');
    }
  };

  return (
    <>
        <Navbar/>

    <div className="max-w-3xl h-[91vh] mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Wallet</h1>

      <form onSubmit={handleAddMoney} className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Money</h2>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full"
            placeholder="Enter amount"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
            Add
          </button>
        </div>
      </form>

      <h2 className="text-xl font-semibold text-gray-700 mb-4">Money Add-On History</h2>
      {history.length > 0 ? (
        <div className="overflow-hidden border-b border-gray-200 shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {history.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{entry.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 text-gray-500">No money add-on history available.</div>
      )}
    </div>
    </>
  );
};

export default Wallet;
