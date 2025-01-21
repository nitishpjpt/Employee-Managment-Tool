import React, { useState, useEffect } from "react";
import EmpDashboard from "../pages/EmpDashboard";
import { Button } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmpAssetsSubmit = () => {
  const [user, setUser] = useState("");
  const [assets, setAssets] = useState([]);
  const [returning, setReturning] = useState(false);

  // Fetch logged-in user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser.data.userResponse);
        setAssets(parsedUser.data.userResponse.assets || []);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

  const isDataAvailable = user && assets.length > 0;

  // Function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date to a readable string
  };

  // Handle asset return request
  const handleReturnAssets = async () => {
    setReturning(true);
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/updateAssetsStatus`,
        {
          employeeId: user._id,
          assets, // Send the list of assets to be returned
        }
      );
      toast.success("Return request submitted successfully!", {
        position: "top-right",
        autoClose: 2000,
      });

      // Update assets state locally (optional, based on backend logic)
      setAssets([]);
    } catch (error) {
      console.error("Error submitting return request:", error);
      toast.error("Failed to submit return request.", {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setReturning(false);
    }
  };

  return (
    <>
      <EmpDashboard />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold">Employee Assets</h2>
          </div>

          {isDataAvailable ? (
            <div className="relative overflow-x-auto pt-10">
              <table className="w-full text-center text-sm text-gray-500 dark:text-gray-400">
                <thead className="text-xs uppercase bg-[#E5E7EB] text-black dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email-id</th>
                    <th className="px-6 py-3">Assign Assets Date</th>
                    <th className="px-6 py-3">Assets</th>
                    <th className="px-6 py-3">Request Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.firstName}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{formatDate(user.updatedAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {assets.map((asset, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full"
                          >
                            {asset}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleReturnAssets}
                        disabled={returning || assets.length === 0}
                      >
                        {returning ? "Processing..." : "Return Assets"}
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Data Not Found
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmpAssetsSubmit;
