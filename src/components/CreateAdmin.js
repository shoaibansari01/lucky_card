import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { RxEyeOpen } from "react-icons/rx";
import Navbar from "./Navbar";
import Constant from "../utils/Constant";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`${Constant.BASE_URL}/admin/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setOtpSent(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${Constant.BASE_URL}/admin/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            otp,
            password,
          }),
        }
      );

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setMessage("Admin created successfully!");
        navigate("/success");
        setTimeout(() => {}, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="h-[91vh] flex flex-col p-">
        <div className="flex flex-grow items-center justify-center bg-gray-200 ">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h1 className="text-2xl font-semibold text-yellow-500 mb-6 text-center">
              Create Admin
            </h1>
            {message && (
              <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-md text-center transition-all duration-300 ease-in-out">
                {message}
              </div>
            )}
            <form
              onSubmit={otpSent ? handleVerifyOTP : handleSendOTP}
              className="space-y-4"
            >
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="mt-1 block w-full p-2 bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  disabled={otpSent || isLoading}
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="mt-1 block w-full p-2 bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  disabled={otpSent || isLoading}
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="mt-1 block w-full p-2 bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  disabled={otpSent || isLoading}
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 top-0 flex items-center pr-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <RxEyeOpen className="text-md text-black" />
                  ) : (
                    <FaEyeSlash className="text-md text-black" />
                  )}
                </div>
              </div>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="mt-1 block w-full p-2 bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  disabled={otpSent || isLoading}
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 top-0 flex items-center pr-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <RxEyeOpen className="text-md text-black" />
                  ) : (
                    <FaEyeSlash className="text-md text-black" />
                  )}
                </div>
              </div>
              {otpSent && (
                <div className="relative">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="mt-1 block w-full p-2 bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    disabled={isLoading}
                    required
                  />
                </div>
              )}
              <button
                className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>{otpSent ? "Verifying OTP..." : "Sending OTP..."}</>
                ) : (
                  <>{otpSent ? "Verify OTP" : "Send OTP"}</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
