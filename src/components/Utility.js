import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

export default function Utility() {
  const [algorithmPercentage, setAlgorithmPercentage] = useState(); 
  const [tempAlgorithmPercentage, setTempAlgorithmPercentage] = useState(); 
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [updatedAt, setUpdatedAt] = useState(""); 

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.replace("http://localhost:3000"); 
    } else {
      fetchAlgorithmPercentage();
    }
  }, []);

  const fetchAlgorithmPercentage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://lucky-card-backend.onrender.com/api/super-admin/getPercentage",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }, 
        }
      );

      const backendUpdatedAt = response.data.updatedAt;
      const parsedDate = new Date(backendUpdatedAt);

      const validDate = isNaN(parsedDate.getTime())
        ? new Date().toLocaleString()
        : parsedDate.toLocaleString();

      setAlgorithmPercentage(response.data.percentage); 
      setTempAlgorithmPercentage(response.data.percentage);
      setUpdatedAt(validDate); 
      setLoading(false);
    } catch (error) {
      setMessage("Error fetching percentage. Please try again.");
      setLoading(false);
    }
  };

  const handleTempAlgorithmPercentageChange = (e) => {
    const value = Math.max(0, Math.min(100, e.target.value)); 
    setTempAlgorithmPercentage(value);
  };

  const handleUpdatePercentage = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        "https://lucky-card-backend.onrender.com/api/super-admin/updatePercentage",
        {
          percentage: tempAlgorithmPercentage, 
          updatedAt: new Date().toISOString(), 
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }, 
        }
      );
      setAlgorithmPercentage(tempAlgorithmPercentage); 

      const backendUpdatedAt = response.data.updatedAt;
      const parsedDate = new Date(backendUpdatedAt);

      const validDate = isNaN(parsedDate.getTime())
        ? new Date().toLocaleString()
        : parsedDate.toLocaleString();

      setUpdatedAt(validDate); 
      setMessage("Percentage updated successfully!"); 
      setLoading(false);
    } catch (error) {
      setMessage("Failed to update percentage. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-200 h-[91vh] flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-6 w-80 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Utility Dashboard</h1>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700">Algorithm Efficiency</h2>
              <div className="flex items-center justify-center mb-4">
                <input
                  type="number"
                  value={tempAlgorithmPercentage} 
                  onChange={handleTempAlgorithmPercentageChange}
                  className="border border-gray-300 rounded-md p-2 w-24 text-center"
                  placeholder="%"
                  min="0"
                  max="100"
                />
              </div>

              {/* Circle displaying percentage */}
              <div className="flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-blue-600">{algorithmPercentage}%</span>
                  </div>
                  <svg className="absolute" width="100%" height="100%" viewBox="0 0 36 36">
                    <path
                      className="text-blue-400"
                      fill="none"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${algorithmPercentage}, 100`} 
                      d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831
                       a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                </div>
              </div>

              <button
                onClick={handleUpdatePercentage}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Update Percentage
              </button>

              {updatedAt && (
                <div className="mt-4">
                  <p className="text-gray-500 text-sm">
                    Last updated:{" "}
                    <span className="font-semibold text-gray-800">
                      {updatedAt}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Success/Error message */}
          {message && (
            <p className={`mt-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
