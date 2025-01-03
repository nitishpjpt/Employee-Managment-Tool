import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoPersonCircleSharp } from "react-icons/io5";

const EmpResetPassword = () => {
  // const location = useLocation();
  // const history = useHistory();
  // const [newPassword, setNewPassword] = useState("");
  // const [message, setMessage] = useState("");

  // const params = new URLSearchParams(location.search);
  // const token = params.get("token");
  // const email = params.get("email");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       `${
  //         import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
  //       }/api/v1/user/employee/reset/password`,
  //       {
  //         token,
  //         email,
  //         newPassword,
  //       }
  //     );
  //     setMessage(response.data.message);
  //     history.push("/login"); // Redirect to login page after success
  //   } catch (error) {
  //     setMessage("Error resetting password.");
  //   }
  // };
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
              Please enter your new password to reset the password.
            </p>
            <form className="space-y-6">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-600"
                >
                  Set New Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  required
                  placeholder="Enter your new password"
                  className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                  onChange={(e) => setNewPassword(e.target.value)}
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

export default EmpResetPassword;
