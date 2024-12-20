import React, { useState, useEffect } from "react";
import EmpDashboard from "../pages/EmpDashboard";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";

const EmpHome = () => {
  const [presentDates, setPresentDates] = useState([]);
  const [fullLeave, setFullLeave] = useState("");
  const [halfLeave, setHalfLeave] = useState("");
  const [reqLeave, setRequestLeave] = useState([]);
  const [reson,setReason] = useState("");

  // Get employee data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("reqLeave");
    const presentUser = localStorage.getItem("employeeLogin");

    if (presentUser) {
      try {
        const userData = JSON.parse(presentUser);
        setPresentDates(userData.data.attendance || [])
        console.log(userData.data.attendance || []);
      } catch (error) {
        console.log("user data does not get",error);
      }
    }



    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const attendanceData = parsedUser.data.attendance; // Ensure this is an array
        // setPresentDates(attendanceData || []); // Fallback to an empty array if undefined
        setFullLeave(parsedUser.data.fullDayLeavesThisMonth);
        setHalfLeave(parsedUser.data.halfDayLeavesThisMonth);
        setRequestLeave(parsedUser.data.requestLeave || []);
        setReason(parsedUser.data.requestLeave[0].fullLeave);
        console.log(parsedUser.data.requestLeave[0].fullLeave)
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

  // Function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date to a readable string
  };

  return (
    <>
      <EmpDashboard />
      {/* Table Section */}
      <div>
        <div className="relative overflow-x-auto pt-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Present Dates
                </th>
                <th scope="col" className="px-6 py-3">
                  Absent Dates
                </th>
                <th scope="col" className="px-6 py-3">
                  Request Leave Half Day{" "}
                  <span className="text-red-500">{halfLeave}</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Request Leave Full Day{" "}
                  <span className="text-red-500">{fullLeave}</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Reason For Leave Request
                </th>
                <th scope="col" className="px-6 py-3">
                  Leave Approve Status
                </th>
              </tr>
            </thead>
            <tbody>
  {presentDates.length > 0 ? (
    presentDates.map((item, index) => {
      // Get the leave request for the employee based on the present date
      const leaveRequest = reqLeave.find(
        (leave) =>
          new Date(leave.fromDate).toLocaleDateString() ===
          new Date(item.date).toLocaleDateString()
      );

      return (
        <tr
          key={index}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            Nitish
          </th>
          <td className="px-6 py-4">{item.date}</td>
          <td className="px-6 py-4">
            {item.status === "Absent" ? "Yes" : "No"}
          </td>

          {/* Display Half Day Leave */}
          <td className="px-6 py-4">
            {leaveRequest && leaveRequest.halfLeave
              ? formatDate(leaveRequest.fromDate)
              : "N/A"}
          </td>

          {/* Display Full Day Leave */}
          <td className="px-6 py-4">
            {leaveRequest && leaveRequest.fullLeave
              ? formatDate(leaveRequest.fromDate)
              : "N/A"}
          </td>

          <td className="px-6 py-4">{leaveRequest?.reason || "N/A"}</td>
          <td className="px-6 py-4 flex justify-center items-center gap-1">
            Approve <FaCheckCircle className="text-green-500" />
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="7" className="px-6 py-4 text-center">
        Data not found
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

export default EmpHome;
