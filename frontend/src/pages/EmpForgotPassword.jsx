import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestOTP = ({ onRequestSuccess }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook to navigate to another route

  const handleRequestOTP = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/reset-password/request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      setMessage(data.message);

      if (data.success) {
        // Store email and navigate to OTP verification page
        onRequestSuccess(email); // Pass email to the parent component
        navigate("/employee/reset/password", { state: { email } }); // Pass email to next page
      }
      setLoading(false);
    } catch (error) {
      console.log("Error in handleRequestOTP:", error);
      setMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Request Password Reset
        </h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          onClick={handleRequestOTP}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          {loading ? "Loading..." : "Request OTP"}
        </button>
        {message && <p className="text-center text-sm mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default RequestOTP;
