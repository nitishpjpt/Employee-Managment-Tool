import React, { useState, useEffect } from "react";
import EmpDashboard from "../pages/EmpDashboard";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa"; // For Rejected status
import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";

const EmpHome = () => {
  const [presentDates, setPresentDates] = useState([]);
  const [fullLeave, setFullLeave] = useState("");
  const [halfLeave, setHalfLeave] = useState("");
  const [reqLeave, setRequestLeave] = useState([]);
  const [reason, setReason] = useState("");

  // Use EmployeeContext to get the employee data
  const { employees } = useContext(EmployeeContext);
  console.log(employees || []);

  // Get employee data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("reqLeave");
    const presentUser = localStorage.getItem("employeeLogin");

    if (presentUser) {
      try {
        const userData = JSON.parse(presentUser);
        setPresentDates(userData.data.existingUser.attendance || []);
        console.log(userData.data.existingUser.attendance || []);
        console.log(userData.data.existingUser.attendance)
      } catch (error) {
        console.log("User data not found", error);
      }
    }

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setFullLeave(parsedUser.data.fullDayLeavesThisMonth);
        setHalfLeave(parsedUser.data.halfDayLeavesThisMonth);
        setRequestLeave(parsedUser.data.requestLeave || []);
        setReason(parsedUser.data.requestLeave[0]?.fullLeave);
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
                  // Find the employee data from the context based on name or _id
                  const employee = employees.find(
                    (emp) => emp.firstName === "Nitish" && emp.lastName === "Prajapati"
                  );

                  // Find the leave request for the employee based on the present date
                  const leaveRequest = employee?.requestLeave?.find(
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

                      <td className="px-6 py-4">
                        {leaveRequest?.reason || "N/A"}
                      </td>

                      {/* Display Leave Approval Status from EmployeeContext */}
                      <td className="px-6 py-4 flex justify-center items-center gap-1">
                        {leaveRequest?.status === "Approved" && (
                          <>
                            <FaCheckCircle className="text-green-500" />{" "}
                            Approved
                          </>
                        )}
                        {leaveRequest?.status === "Rejected" && (
                          <>
                            <FaTimesCircle className="text-red-500" /> Rejected
                          </>
                        )}
                        {(!leaveRequest || leaveRequest.status === "Pending") && (
                          <span className="text-yellow-500">Pending</span>
                        )}
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
