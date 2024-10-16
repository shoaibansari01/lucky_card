import React, { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { RxEyeOpen } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Constant from "../utils/Constant";
const SuperAdmin = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ username, password });
    try {
      const response = await axios.post(
        "https://lucky-card-backend.onrender.com/api/super-admin/login",
        
        {
          username,
          password,
        }
      );
      
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("authToken", token);

        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/admindata");
        }, 3000);
      }
    } catch (error) {
      console.error("Error creating superadmin:", error);
      toast.error("There was an error logging in.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };                                          

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-yellow-500 mb-6 text-center">
          Superadmin
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full p-2 rounded bg-gray-700 border border-yellow-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-300">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 rounded bg-gray-700 border border-yellow-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <div
              className="absolute inset-y-0 right-3 top-6 flex items-center pr-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <RxEyeOpen className="text-md text-white" />
              ) : (
                <FaEyeSlash className="text-md text-white" />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-green-600 text-white mt-4 font-semibold hover:bg-green-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SuperAdmin;
