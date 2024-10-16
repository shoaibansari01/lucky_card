import React from 'react'

export default function Navbar() {
  return (
    <div>
      <nav className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold"></h2>
        <div className="flex space-x-4">
          {/* <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded-md transition duration-200">
             Your Admins
          </button> */}
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
            Logout
          </button>
        </div>
      </nav>
    </div>
  )
}
