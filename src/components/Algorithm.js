import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
export default function Algorithm() {
  const [selectedOption, setSelectedOption] = useState("");
  useEffect(() => {
    // Check if token exists, if not redirect to login page
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.replace("http://localhost:3000"); // Redirect to login page
    }
  }, []);
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (value) {
      axios
        .post(
          "https://lucky-card-backend.onrender.com/api/super-admin/choose-algorithm",
          {
            algorithm: value,
          }
        )
        .then((response) => {
          console.log("Data posted successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error posting data:", error);
        });
    }
  };
  return (
    <>
      <Navbar />
      <div className="h-[91vh] flex items-center justify-center bg-gray-200 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full ">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Select Algorithm Option
          </h2>
          <div className="mb-4">
            <label
              htmlFor="algorithmOptions"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Choose an option:
            </label>
            <select
              id="algorithmOptions"
              value={selectedOption}
              onChange={handleSelectChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
            >
              <option value="">--Select an option--</option>
              <option value="default">Default</option>
              <option value="zeroAndRandom">With Zero</option>
              <option value="minAmount">With Minimum</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => console.log(`Selected Option: ${selectedOption}`)} // Optional button for testing
              className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}