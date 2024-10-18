
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('authToken');

    navigate('/'); L
  };

  return (
    <div>
      <nav className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold"></h2>
        <div className="flex space-x-4">
          <button
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}