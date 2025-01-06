import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import MainDashboard from "../pages/MainDashboard.jsx";
import { FaPen, FaTrashAlt } from "react-icons/fa";

const FrontPage = () => {
  const [getallUser, setAllUser] = useState([]);

  // Function to get all user registration details
  const getAllUserRegisterDetails = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/all/registerDetails`
      );
      setAllUser(response.data.data.user); // Update state with the user data
      console.log("All registered users:", response.data.data.user);
    } catch (error) {
      console.log("Error fetching registered users:", error);
    }
  };

  useEffect(() => {
    getAllUserRegisterDetails();
  }, []);

  return (
    <>
      <MainDashboard />
      <div className="relative overflow-x-auto pt-6 ml-[15.2rem] p-2  max-w-7xl">
        <h1 className="text-center pb-4 font-semibold text-2xl text-gray-800">
          All employee details
        </h1>
        <div className="overflow-hidden bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Department
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Emp-code
                </th>
                <th scope="col" className="px-6 py-3">
                  Salary
                </th>
                <th scope="col" className="px-6 py-3">
                  Joining Date
                </th>
              </tr>
            </thead>
            <tbody>
              {getallUser.length > 0 ? (
                getallUser.map((user, index) => (
                  <tr key={index} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.firstName} {user.lastName}
                    </th>
                    <td className="px-6 py-4">{user.location}</td>
                    <td className="px-6 py-4">{user.department}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.employeeCode}</td>
                    <td className="px-6 py-4">
                      {user.salary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(user.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FrontPage;
