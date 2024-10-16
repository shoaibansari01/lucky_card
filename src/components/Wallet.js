import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const AdminWalletUpdate = () => {
  const [admins, setAdmins] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [walletHistory, setWalletHistory] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    if (adminId) {
      fetchWalletHistory();
    }
  }, [adminId]);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "https://lucky-card-backend.onrender.com/api/super-admin/all-admins",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAdmins(data);
      } else {
        setError("Failed to fetch admin list");
      }
    } catch (error) {
      setError("Error connecting to the server");
    }
  };
  const fetchWalletHistory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        ` http://localhost:5000/api/super-admin/wallet-history/${adminId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setWalletHistory(data.data.transactions);
        console.log(data);
      } else {
        setError("Failed to fetch wallet history");
      }
    } catch (error) {
      setError("Error fetching wallet history");
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!adminId) {
      setError("Please select an admin");
      return;
    }
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "https://lucky-card-backend.onrender.com/api/super-admin/add-to-wallet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            adminId: adminId,
            amount: Number(depositAmount),
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage(`Deposit successful! New balance: ${data.newBalance}`);
        setDepositAmount("");

        // Add the new transaction to wallet history with transaction ID from backend
        const newTransaction = {
          _id: data.transactionId || "new", // Using transaction ID from backend response if available
          adminId: adminId,
          amount: Number(depositAmount),
          transactionType: "Deposit",
          timestamp: new Date().toISOString(),
        };

        setWalletHistory((prevHistory) => [newTransaction, ...prevHistory]);

      } else {
        setError(data.error || "An error occurred");
      }
    } catch (error) {
      setError("Failed to connect to the server");
    }
  };



  // const handleWithdraw = async (e) => {
  //   e.preventDefault();
  //   setMessage("");
  //   setError("");
  //   if (!adminId) {
  //     setError("Please select an admin");
  //     return;
  //   }
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     const response = await fetch(
  //       "https://lucky-card-backend.onrender.com/api/super-admin/withdraw-from-wallet",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           adminId: adminId,
  //           amount: Number(withdrawAmount),
  //         }),
  //       }
  //     );
  //     const data = await response.json();
  //     if (response.ok) {
  //       setMessage(`Withdrawal successful! New balance: ${data.newBalance}`);
  //       setWithdrawAmount("");
  //       fetchWalletHistory();
  //     } else {
  //       setError(data.error || "An error occurred");
  //     }
  //   } catch (error) {
  //     setError("Failed to connect to the server");
  //   }
  // };

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 h-[91vh] flex flex-col items-center space-y-6 ">
        <div className="w-[500px] mb-4 mt-8 p-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Update Admin Wallet
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="adminSelect"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Admin
              </label>
              <select
                id="adminSelect"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="mt-1 block w-full p-2 bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                <option value="">Select an admin</option>
                {admins.map((admin) => (
                  <option key={admin.adminId} value={admin.adminId}>
                    {admin.name} ({admin.email}) - Balance:{" "}
                    {admin.walletBalance}
                  </option>
                ))}
              </select>
            </div>

            {/* Deposit Box */}
            <form onSubmit={handleDeposit} className="space-y-4">
              <div>
                <label
                  htmlFor="depositAmount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deposit Amount
                </label>
                <input
                  type="number"
                  id="depositAmount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full p-2 bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md"
              >
                Deposit
              </button>
            </form>
            {/* onSubmit={handleWithdraw}  */}
            {/* Withdraw Box */}
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="withdrawAmount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Withdraw Amount
                </label>
                <input
                  type="number"
                  id="withdrawAmount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full p-2 bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-red-600 text-white rounded-md"
              >
                Withdraw
              </button>
            </form>

            {/* Message */}
            {message && <div className="bg-green-100 p-3 mt-4">{message}</div>}
            {error && <div className="bg-red-100 p-3 mt-4">{error}</div>}
          </div>
        </div>

        {/* Wallet History */}
        <div className="w-[1100px] p-6 bg-white rounded-lg shadow-xl ">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Wallet History
          </h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Sr.No
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Transaction Id
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Admin Id
                </th>

                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Amount
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {walletHistory.length > 0 ? (
                walletHistory.map((transaction, index) => (
                  <tr key={transaction._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
 
                    <td className="px-4 py-2">{transaction._id}</td>
                    <td className="px-4 py-2">{transaction.adminId}</td>
                    <td className="px-4 py-2">{transaction.amount}</td>
                    <td className="px-4 py-2">{transaction.transactionType}</td>
                    <td className="px-4 py-2">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-2">
                    No transactions found
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

export default AdminWalletUpdate;
