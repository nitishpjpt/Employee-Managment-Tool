import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        `http://localhost:8000/api/v1/user/Login`,
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

      toast.success("User Login successfully!", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => {
          navigate("/Dashboard");
        },
      });
    } catch (error) {
      console.log("User login failed", error);
      toast.error("User login failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="pt-[10rem] h-[100vh] bg-[#8194DC] ">
        <div className="max-w-md  mx-auto p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-center p-4 font-bold text-2xl">
            Login into your account
          </h1>
          <form onSubmit={submitHandler} className="p-2">
            <label for="username" className="font-semibold">
              Username/email
            </label>
            <br />
            <input
              className="border p-2 w-[20rem] mt-4"
              type="text"
              id="username"
              name="username"
              required
              onChange={(e) =>
                setUserName(e.target.value) || setEmail(e.target.value)
              }
            />
            <br />
            <label for="password">Password:</label>
            <br />
            <input
              className="border p-2 w-[20rem]"
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button
              type="submit"
              className="bg-[#445CAB] text-white font-semibold p-2 w-[20rem] mt-4"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default login;
