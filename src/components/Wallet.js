// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";
// import Constant from "../utils/Constant";

// const Wallet = () => {
//   const [amount, setAmount] = useState("");
//   const [admins, setAdmins] = useState([]);
//   const [selectedAdmin, setSelectedAdmin] = useState("");
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     axios
//       .get(`${Constant.BASE_URL}/admin/all-admins`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setAdmins(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching admins:", error);
//       });
//   }, []);

//   const handleAddMoney = async (e) => {
//     e.preventDefault();
//     if (amount && selectedAdmin) {
//       console.log("Selected Admin ID:", selectedAdmin); 
//       const token = localStorage.getItem("authToken");

//       try {
//         const response = await axios.post(`${Constant.BASE_URL}/super-admin/add-to-wallet`,
//           {
//             adminId: selectedAdmin,
//             amount: parseFloat(amount),
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
  
//         console.log(response.data.message); 
//       } catch (error) {
//         console.error("Error adding to wallet:", error.response.data); 
//       }
//     }
//   };
  

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-3xl h-[91vh] mx-auto p-6 bg-white rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">Wallet</h1>

//         <form onSubmit={handleAddMoney} className="mb-8">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Money</h2>
//           <div className="flex items-center space-x-4">
//             <select
//               value={selectedAdmin}
//               onChange={(e) => setSelectedAdmin(e.target.value)}
//               className="border border-gray-300 p-2 rounded-md w-full"
//               required
//             >
//               <option value="" disabled>Select Admin</option>
//               {admins.map((admin) => (
//                 <option key={admin.adminId} value={admin.adminId}>
//                   {admin.name} - {admin.email}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="border border-gray-300 p-2 rounded-md w-full"
//               placeholder="Enter amount"
//               required
//             />
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
//             >
//               Add
//             </button>
//           </div>
//         </form>

//         <h2 className="text-xl font-semibold text-gray-700 mb-4">
//           Money Add-On History
//         </h2>
//         {history.length > 0 ? (
//           <div className="overflow-hidden border-b border-gray-200 shadow-md rounded-lg">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Amount
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Admin ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {history.map((entry) => (
//                   <tr key={entry.id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {entry.id}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       ₹{entry.amount}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {entry.adminId}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {entry.date}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="mt-4 text-gray-500">
//             No money add-on history available.
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Wallet;
import React, { useState, useEffect } from 'react';
const AdminWalletUpdate = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    fetchAdmins();
  }, []);
  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Retrieve JWT from local storage
      const response = await fetch("https://lucky-card-backend.onrender.com/api/admin/all-admins", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include JWT in the request
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAdmins(data);
        console.log(data)
      } else {
        setError('Failed to fetch admin list');
      }
    } catch (error) {
      setError('Error connecting to the server');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!selectedAdminId) {
      setError('Please select an admin');
      return;
    }
    try {
      const token = localStorage.getItem('authToken'); // Retrieve JWT from local storage
      const response = await fetch("https://lucky-card-backend.onrender.com/api/super-admin/add-to-wallet", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include JWT in the request
        },
        body: JSON.stringify({ adminId: selectedAdminId, amount: Number(amount) }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Success! New balance for Admin: ${data.newBalance}`);
        setSelectedAdminId('');
        setAmount('');
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (error) {
      setError('Failed to connect to the server');
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Admin Wallet</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="adminSelect" className="block text-sm font-medium text-gray-700 mb-1">
            Select Admin
          </label>
          <select
            id="adminSelect"
            value={selectedAdminId}
            onChange={(e) => setSelectedAdminId(e.target.value)}
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select an admin</option>
            {admins.map((admin) => (
              <option key={admin.email} value={admin.email}>
                {admin.name} ({admin.email}) - Balance: {admin.walletBalance}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount to Add
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Wallet
        </button>
      </form>
      {message && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          {message}
        </div>
      )}
      {error && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}
    </div>
  );
};
export default AdminWalletUpdate;