import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Successfull() {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <div className="h-[91vh] flex flex-col justify-center items-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-3xl font-semibold text-green-500 mb-4 text-center">
          Admin Created Successfully!
        </h1>
        <p className="text-black text-center mb-6">
        Check your admin in your admins
        </p>
        <button
          onClick={() => navigate("/admindata")}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 text-center"
        >
          Go to Your Admins
        </button>
      </div>
    </div>
    </>
  );
}

export default Successfull;
