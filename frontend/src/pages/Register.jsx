import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phnNumber, setPhnNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactId, setContactId] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Make sure passwords match
    if (password !== confirmPassword) {
      toast.error("confirm password do not match!");
      return;
    }

    // Prepare the data to send to the backend
    const userData = {
      username,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phnNumber,
      contactId,
    };

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/register`, // Correct the endpoint if needed
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      // Store user data in local storage
      localStorage.setItem("registerUser", JSON.stringify(response.data));

      toast.success("User registered successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("User registration failed");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#EAF1FF] flex items-center justify-center px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Deepnap Softech
            </h1>
            <p className="text-gray-600 mt-2">
              Track and manage your employees with ease
            </p>
          </div>
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700">
                <Link>Register</Link>
              </h2>
              <p className="text-sm text-gray-500">
                Already have an account as Admin then?{" "}
                <span className="text-blue-600">
                  <Link to="/Login">Log in</Link>
                </span>
                .
              </p>
              <p className="text-sm text-gray-500">
                If you have an employee then?{" "}
                <span className="text-blue-600">
                  <Link to="/employee/Login">Log in</Link>
                </span>
                .
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Choose a Username"
                name="username"
                onChange={(e) => setUserName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Your Email Address"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Choose a Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Your Password"
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Phone Number
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Phone Number"
                  name="phnNumber"
                  onChange={(e) => setPhnNumber(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Preferred Contact ID
              </label>
              <input
                type="text"
                placeholder="Enter your preferred ID"
                name="contactId"
                onChange={(e) => setContactId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
