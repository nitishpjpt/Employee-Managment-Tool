import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const EmpForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email,
    };

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/forget/password`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Log response for debugging
      console.log("Login response:", response);

      // Handle time data

      // Store user data in local storage
      localStorage.setItem("employeeLogin", JSON.stringify(response.data));
      console.log("Employee data stored in localStorage:", response.data);

      // Show success toast and navigate to home page after it completes
      toast.success("Employee reset password successfully!", {
        position: "top-right",
        autoClose: 1000,
        onClose: () => {
          navigate("/employee/reset/password");
          window.location.reload(); // Ensure the page reloads after navigation
        },
      });

      // Fallback navigation in case the toast onClose fails
    } catch (error) {
      console.error("Employee login failed:", error);
      setLoading(false);
      // Show error toast
      toast.error("Employee reset password failed. Please try again.", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="h-screen pb-[6rem] flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#d9e8ff]">
        <div className="flex flex-col lg:flex-col bg-white rounded-2xl shadow-2xl overflow-hidden ">
          {/* Left Section with Illustration */}
          <div className="hidden lg:flex  bg-gradient-to-tr from-[#6c63ff] to-[#b993d6] justify-center items-center relative">
            {/* Decorative Circle */}
            <div className="absolute w-64 h-64 bg-white/20 rounded-full blur-2xl"></div>
            <div className="absolute w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            <img
              src="https://cdn.prod.website-files.com/63c50a0cab4c86831ccbeef6/63e5dfffa9332278d24932fc_21404-removebg-preview.png"
              alt="Login Illustration"
              className="w-1/2 pr-[4rem] object-contain"
            />
          </div>

          {/* Right Section with Form */}
          <div className="flex flex-col justify-center p-8 ">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
              Welcome Back !
            </h1>
            <p className="text-gray-500 text-center mb-6">
              Please enter your email to reset the password.
            </p>
            <form className="space-y-6">
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-3 text-white font-bold bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                {loading ? "Reset password..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpForgotPassword;
