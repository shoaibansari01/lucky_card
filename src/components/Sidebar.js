import React from "react";
import { Link } from "react-router-dom";
import { HiUserAdd, HiUsers } from "react-icons/hi";
import { FaWallet } from 'react-icons/fa';
import { AiFillTool } from 'react-icons/ai';
import { FaUserShield } from 'react-icons/fa';
import { AiOutlineHistory } from 'react-icons/ai';
import { SiAlgorand } from "react-icons/si";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800  p-4 pt-4 text-white shadow-md ">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-center mb-2">
          Super Admin{" "}
        </h1>
      </div>

      <ul>
        <li className="mb-4">
          <Link
            to="/admindata"
            className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
          >
            <HiUsers className="h-5 w-5 mr-3" />
            Your Admins
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/create"
            className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
          >
            <HiUserAdd className="h-5 w-5 mr-3" />
            Create Admin
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/wallet"
            className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
          >
            <FaWallet className="h-5 w-5 mr-3" />
            Wallet{" "}
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/utility"
            className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
          >
            <AiFillTool className="h-5 w-5 mr-3" />
            Utility
          </Link>
        </li>

        <li className="mb-4"> 
          <Link
            to="/gamehistory"
            className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
          >
            <SiAlgorand
            className="h-5 w-5 mr-3" />
           Algorithm
          </Link>
        </li>

        <li className="mb-4">
          <Link
            to="/gamehistory"
            className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
          >
            <AiOutlineHistory className="h-5 w-5 mr-3" />
            Game Id History
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
