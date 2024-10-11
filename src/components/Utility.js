import React, { useState } from 'react';
import Navbar from './Navbar';

export default function Utility() {
  const [minutes, setMinutes] = useState(5); 
  const [seconds, setSeconds] = useState(0);
  const algorithmPercentage = 85; 

  const handleMinutesChange = (e) => {
    setMinutes(e.target.value);
  };

  const handleSecondsChange = (e) => {
    setSeconds(e.target.value);
  };

  const handleStartTimer = () => {
    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    alert(`Timer set for ${totalSeconds} seconds!`); 
  };

  return (
    <>
    <Navbar/>
    <div className="p-6 bg-gray-100 h-screen flex flex-col items-center justify-center h-[91vh]">
      <div className="bg-white rounded-lg shadow-md p-6 w-80 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Utility Dashboard</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Set Timer for Admin Change</h2>
          <div className="flex justify-center items-center space-x-2">
            <input
              type="number"
              value={minutes}
              onChange={handleMinutesChange}
              className="border border-gray-300 rounded-md p-2 w-12"
              placeholder="Min"
            />
            <span className="text-lg font-bold">:</span>
            <input
              type="number"
              value={seconds}
              onChange={handleSecondsChange}
              className="border border-gray-300 rounded-md p-2 w-12"
              placeholder="Sec"
            />
            <button
              onClick={handleStartTimer}
              className="ml-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              Start Timer
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Algorithm Efficiency</h2>
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
                  strokeDasharray={`${algorithmPercentage}, 100`} // Percent of the algorithm displayed
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
