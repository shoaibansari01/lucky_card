
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate(); // React Router's navigate hook

  const handleLogout = () => {
    // Remove the auth token from localStorage
    localStorage.removeItem('authToken');

    // Redirect to the home page
    navigate('/'); // or navigate('http://localhost:3000') if you want the full URL
  };

  return (
    <div>
      <nav className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold"></h2>
        <div className="flex space-x-4">
          <button
            onClick={handleLogout} // Trigger handleLogout on click
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}