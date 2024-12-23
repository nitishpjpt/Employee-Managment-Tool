import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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

  const submitHandler = async (e) => {
    e.preventDefault();

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
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/register`, // Correct the endpoint if needed
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

      toast.success("User registered successfully!", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => {
          navigate("/login");
        },
      });
    } catch (error) {
      toast.error("User registration failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="text-center pt-8">
        <h1 className="text-4xl font-semibold">Deepnap Softech</h1>
      </div>
      <div className="max-w-[100vw] p-4">
        <form
          onSubmit={submitHandler}
          className="max-w-[60vw] mx-auto p-8 bg-white rounded-lg shadow-md"
        >
          <div className="mb-4">
            <h1 className="text-xl font-semibold">Register Page</h1>
            <p className="bg-slate-200 p-2">
              If you already have an account, please log in to continue.
            </p>
          </div>

          <div className="border p-8 space-y-4">
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
              <label className="font-semibold">First & Last Name</label>
              <div className="flex gap-4 w-full sm:w-auto">
                <input
                  className="border p-1 w-full"
                  required
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="border p-1 w-full"
                  required
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="font-semibold">Choose a Username</label>
              <input
                className="border p-1 w-full"
                required
                type="text"
                placeholder="Choose a Username"
                name="username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold">Your E-Mail Address</label>
              <input
                className="border p-1 w-full"
                required
                type="email"
                placeholder="Your E-Mail Address"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold">Choose a Password</label>
              <input
                className="border p-1 w-full"
                required
                type="password"
                placeholder="Choose a Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold">Confirm Your Password</label>
              <input
                className="border p-1 w-full"
                required
                type="password"
                placeholder="Confirm Your Password"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold">Phone Number</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  className="border p-1 w-full sm:w-1/2"
                  required
                  type="number"
                  placeholder="Phone Number"
                  name="phnNumber"
                  onChange={(e) => setPhnNumber(e.target.value)}
                />
                <button className="p-2 bg-slate-300 w-full sm:w-auto">
                  Send verification code
                </button>
              </div>
            </div>
            <div className="mb-4 flex gap-2 items-center">
              <input className="border p-1" required type="checkbox" />
              <p>This is my WhatsApp Number as well.</p>
            </div>
            <div className="mb-4">
              <label className="font-semibold">
                Preferred Points of Contact:
              </label>
              <input
                className="border p-1 w-full"
                required
                type="text"
                placeholder="Enter your preferred id"
                name="contactId"
                onChange={(e) => setContactId(e.target.value)}
              />
            </div>
            <button className="bg-slate-200 p-2 w-full sm:w-auto">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
