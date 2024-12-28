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

  const submitHandler = async (e) => {
    e.preventDefault();

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

      toast.success("Admin Login successfully!", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => {
          navigate("/home");
          window.location.reload(); // Ensure the page reloads after navigation
        },
      });

      // Fallback in case toast onClose doesn't work as expected
      setTimeout(() => {
        navigate("/home");
        window.location.reload(); // Ensures page reloads after login
      }, 3100); // Slight delay to let the toast autoClose first
    } catch (error) {
      console.log("Admin login failed", error);
      toast.error("Admin login failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="pt-[10rem] h-[100vh] bg-[#F3F4F6] ">
        <div className="max-w-md  mx-auto p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-center p-4 font-bold text-2xl">Admin Login</h1>
          <form onSubmit={submitHandler} className="p-4 ">
            <label for="username" className="font-semibold">
              Username/email
            </label>
            <br />
            <input
              className="border p-2 w-[20rem] mt-4 rounded-lg"
              type="text"
              id="username"
              name="username"
              required
              onChange={(e) =>
                setUserName(e.target.value) || setEmail(e.target.value)
              }
            />
            <br />
            <label className="pt-2" for="password">
              Password:
            </label>
            <br />
            <input
              className="border p-2 w-[20rem] rounded-lg"
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button
              type="submit"
              className="bg-[#3F83F8] text-white font-semibold p-2 w-[20rem] mt-4 rounded-lg"
            >
              Login
            </button>
            <h1 className="mt-5">
              If you don't have account?{" "}
              <span className="text-blue-600">
                <Link to="/Register">Register</Link>
              </span>
            </h1>
          </form>
        </div>
      </div>
    </>
  );
};

export default login;
