import React, { useEffect, useState } from "react";
import MainDashboard from "../pages/MainDashboard";
import axios from "axios";
import { IoEyeSharp } from "react-icons/io5";
import { Button } from "@mui/material";

const LeaveRequest = () => {
  const [allUsers, setAllUsers] = useState([]);

  // Fetch all registered employees with leave requests
  const fetchAllUsers = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/employee/all/registerDetails`
      );
      setAllUsers(response.data.data.user);
    } catch (error) {
      console.error("Error fetching registered users:", error);
      alert("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // get the latest leave request 
  const getLatestLeave = (requestLeave) => {
    if (!requestLeave || requestLeave.length === 0) return null;
    return requestLeave.reduce((latest, current) =>
      new Date(current.fromDate) > new Date(latest.fromDate) ? current : latest
    );
  };

  // Handle leave status update (Approve, Reject, Pending)
  const handleLeaveStatusUpdate = async (userId, leaveId, status) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/employee/requestLeave/update`,
        { userId, leaveId, status }
      );

      const updatedEmployee = response.data.updatedEmployee;
      console.log(updatedEmployee);

      // Update the state with the updated employee data
      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? updatedEmployee : user
        )
      );

      alert(`Leave request ${status.toLowerCase()} successfully.`);
    } catch (error) {
      console.error(`Error updating leave status to ${status}:`, error);
      alert(`Failed to update leave status to ${status}.`);
    }
  };

  return (
    <div>
      <MainDashboard />
      <div className="relative overflow-x-auto ml-[5rem]">
        <h1 className="text-center text-lg font-bold p-5">
          Employee Leave Approval
        </h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Full Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Emp-code</th>
              <th className="px-6 py-3">Latest Leave Type</th>
              <th className="px-6 py-3">From Date</th>
              <th className="px-6 py-3">To Date</th>
              <th className="px-6 py-3">Reason</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length > 0 ? (
              allUsers.map((user) => {
                const latestLeave = getLatestLeave(user.requestLeave);

                return (
                  <tr
                    key={user._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.department}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.employeeCode}</td>
                    <td className="px-6 py-4">
                      {latestLeave
                        ? latestLeave.fullLeave
                          ? "Full Day"
                          : "Half Day"
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {latestLeave
                        ? new Date(latestLeave.fromDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {latestLeave?.toDate
                        ? new Date(latestLeave.toDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {latestLeave?.reason || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {latestLeave?.status || "Pending"}
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2 items-center">
                      <Button
                     variant="contained" color="success"
                        onClick={() =>
                          handleLeaveStatusUpdate(user._id, latestLeave?._id, "Approved")
                        }
                        className="text-green-500 hover:underline"
                        disabled={!latestLeave || latestLeave.status === "Approved"}
                      >
                        Approve
                      </Button>
                      <Button
                     variant="contained" color="error"
                        onClick={() =>
                          handleLeaveStatusUpdate(user._id, latestLeave?._id, "Rejected")
                        }
                        className="text-red-500 hover:underline"
                        disabled={!latestLeave || latestLeave.status === "Rejected"}
                      >
                        Reject
                      </Button>
                      <Button
                      variant="contained"
                        onClick={() =>
                          handleLeaveStatusUpdate(user._id, latestLeave?._id, "Pending")
                        }
                        className="text-yellow-500 hover:underline"
                        disabled={!latestLeave || latestLeave.status === "Pending"}
                      >
                        Pending
                      </Button>
                     
                    </td>
                  </tr>
                );
              })
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
