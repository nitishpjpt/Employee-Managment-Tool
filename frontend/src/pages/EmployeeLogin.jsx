import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import moment from "moment";



const EmployeeLogin = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState(null); // State for user's location
  const navigate = useNavigate();

  // Function to get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
          toast.warn(
            "Unable to fetch location. Please enable location services.",
            {
              position: "top-right",
              autoClose: 3000,
            }
          );
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);
 

  const submitHandler = async (e) => {
    e.preventDefault();
  
    const userData = {
      email,
      password,
      location, // Ensure location is being set correctly before using
    };
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/employee/login`,
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
      const date = new Date(response.data.data.createdAt);
      console.log(
        `Date: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      );
      console.log(
        `Time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      );
  
      // Store user data in local storage
      localStorage.setItem("employeeLogin", JSON.stringify(response.data));
      console.log("Employee data stored in localStorage:", response.data);
  
      // Show success toast and navigate to home page after it completes
      toast.success("Employee Login successfully!", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => {
          navigate("/employee/home");
          window.location.reload(); // Ensure the page reloads after navigation
        },
      });
  
      // Fallback navigation in case the toast onClose fails
      setTimeout(() => {
        navigate("/employee/home");
        window.location.reload(); // Ensure page state is fresh
      }, 3100); // Slight delay beyond toast autoClose
    } catch (error) {
      console.error("Employee login failed:", error);
  
      // Show error toast
      toast.error("Employee login failed. Please try again.", {
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
          <h1 className="text-center flex justify-center gap-2 items-center p-4 font-bold text-2xl">
            Employee Login{" "}
            <IoPersonCircleSharp className="text-4xl text-[#1976D2]" />
          </h1>
          <form onSubmit={submitHandler} className="p-2">
            <label htmlFor="username" className="font-semibold">
              Employee Username/email
            </label>
            <br />
            <input
              className="border p-2 w-[20rem] mt-4"
              type="text"
              id="username"
              name="username"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="password" className="font-semibold">
              Password:
            </label>
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

export default EmployeeLogin;
