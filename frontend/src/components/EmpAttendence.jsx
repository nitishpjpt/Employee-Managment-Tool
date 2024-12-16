import React, { useState } from "react";
import EmpDashboard from "../pages/EmpDashboard";
import { useEffect } from "react";

const EmpAttendence = () => {
  const [name, setName] = useState("");
  const [fullDay, setFullDay] = useState("3");
  const [halfDay, setHalfDay] = useState("5");

  // local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("reqLeave");
    if (storedUser) {
      try {
        var parsedUser = JSON.parse(storedUser);
        setName(parsedUser.data);
        setFullDay(parsedUser.data.fullDayLeavesThisMonth);
        setHalfDay(parsedUser.data.halfDayLeavesThisMonth);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

  return (
    <div>
      <EmpDashboard />
      {/* Table */}
      <div className="flex justify-center items-center pt-14 ">
        <table className="  text-sm  text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>

              <th className="px-6 py-3">
                Full Day Leave <span className="text-red-500">(3)</span>
              </th>
              <th className="px-6 py-3">
                Half Day <span className="text-red-500">(5)</span>
              </th>
              <th className="px-6 py-3">Paid Leave</th>
              <th className="px-6 py-3">Week Of</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{name.firstName}</td>
              <td className="px-6 py-4">{name.email}</td>
              {/* Background Verification Fields */}
              <td className="px-6 py-4 text-center">{fullDay}</td>
              <td className="px-6 py-4 text-center">{halfDay}</td>
              <td className="px-6 py-4">driving</td>
              <td className="px-6 py-4">voterCard</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpAttendence;
