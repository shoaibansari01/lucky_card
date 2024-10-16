
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const AdminWalletUpdate = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Function to check for authToken
  const checkAuthToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.replace("http://localhost:3000"); // Redirect to login page if token is missing
    }
  };

  useEffect(() => {
    checkAuthToken(); // Check token on component mount
    fetchAdmins(); // Fetch the admin list
  }, []);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve JWT from local storage
      const response = await fetch(
        "https://lucky-card-backend.onrender.com/api/super-admin/all-admins",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT in the request
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAdmins(data);
        console.log(data);
      } else {
        setError("Failed to fetch admin list");
      }
    } catch (error) {
      setError("Error connecting to the server");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!selectedAdminId) {
      setError("Please select an admin");
      return;
    }
    try {
      const token = localStorage.getItem("authToken"); // Retrieve JWT from local storage
      const response = await fetch(
        "https://lucky-card-backend.onrender.com/api/super-admin/add-to-wallet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include JWT in the request
          },
          body: JSON.stringify({
            adminId: selectedAdminId,
            amount: Number(amount),
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage(`Success! New balance for Admin: ${data.newBalance}`);
        setSelectedAdminId("");
        setAmount("");
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (error) {
      setError("Failed to connect to the server");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 h-[86vh] bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Update Admin Wallet
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="adminSelect"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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
                <option key={admin.adminId} value={admin.adminId}>
                  {admin.name} ({admin.email}) - Balance: {admin.walletBalance}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
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
    </>
  );
};

export default AdminWalletUpdate;
