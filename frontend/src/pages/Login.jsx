import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/Login`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      // Store user data in local storage
      localStorage.setItem("userLogin", JSON.stringify(response.data));

      toast.success("Admin Login successfully!");

      // Fallback in case toast onClose doesn't work as expected
      setTimeout(() => {
        navigate("/home");
        window.location.reload(); // Ensures page reloads after login
      }, 3100); // Slight delay to let the toast autoClose first
    } catch (error) {
      console.log("Admin login failed", error);
      setLoading(false);
      toast.error("Admin login failed. Please try again.");
    }
  };

  return (
    <>
      <div className="h-screen pb-[6rem] flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#d9e8ff]">
        <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl">
          {/* Left Section with Illustration */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-[#6c63ff] to-[#b993d6] justify-center items-center relative">
            {/* Decorative Circle */}
            <div className="absolute w-64 h-64 bg-white/20 rounded-full blur-2xl"></div>
            <div className="absolute w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            <img
              src="https://www.ubitechsolutions.com/_next/image?url=%2Fimages%2FhrmAutomationIcon.png&w=1920&q=75"
              alt="Login Illustration"
              className="w-3/4 object-contain"
            />
          </div>

          {/* Right Section with Form */}
          <div className="flex flex-col justify-center p-8 lg:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
              Welcome Back!
            </h1>
            <p className="text-gray-500 text-center mb-6">
              Please login to access your admin account.
            </p>
            <form onSubmit={submitHandler} className="space-y-6">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  placeholder="Enter your email/username"
                  className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                  className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-3 text-white font-bold bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className="text-center text-sm text-gray-500 mt-6">
              <a href="#" className="text-indigo-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
