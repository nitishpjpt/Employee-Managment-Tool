import React from "react";
import MainDashboard from "../pages/MainDashboard";
import  { useEffect, useState } from "react";
import axios from "axios";
import { IoEyeSharp } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "@mui/material";

const LeaveRequest = () => {
  const [getallUser, setAllUser] = useState([]);

  // Function to get all user registration details
  const getAllUserRegisterDetails = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/employee/all/registerDetails`
      );
      setAllUser(response.data.data.user); // Update state with the user data
      console.log(response.data.data.user[0].requestLeave);
      
    } catch (error) {
      console.log("Error fetching registered users:", error);
    }
  };

  useEffect(() => {
    getAllUserRegisterDetails();
  }, []);

  return (
    <div>
      <MainDashboard />
     

      <div className="relative overflow-x-auto ml-[5rem] ">
        <h1 className="text-center text-lg font-bold p-5">Employee Leave Approval</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {getallUser.length > 0 ? (
              getallUser.map((user, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.firstName} {user.lastName}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.location}</td>
                  <td className="px-6 py-4">{user.department}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">{user.employeeCode}</td>

                  <td className="px-6 py-4 flex justify-center gap-1 items-center py-8">
                    <IoIosSettings className="text-blue-400" />
                    <RiDeleteBin6Line className="text-red-500" />
                    <IoEyeSharp className="text-blue-400" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
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
  );
};

export default LeaveRequest;
