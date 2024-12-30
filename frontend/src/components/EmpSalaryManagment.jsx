import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { saveAs } from "file-saver";
import MainDashboard from "../pages/MainDashboard.jsx";

const EmpSalaryManagement = () => {
  const [allUsers, setAllUsers] = useState([]); // Use allUsers for the data
  const [employeeData, setEmployeeData] = useState({});
  const [updatedSalaries, setUpdatedSalaries] = useState([]);

  // Fetch all registered employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/all/registerDetails`
      );
      setAllUsers(response.data.data.user || []); // Corrected: Set data to allUsers state
      console.log(response.data.data.user || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Calculate salary based on wages and present days
  const calculateSalary = (wage, presentDays) => {
    return wage * presentDays;
  };

  // Update the wage of an employee and calculate their salary
  const handleWageChange = (e, userId) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [userId]: {
        ...employeeData[userId],
        [name]: value,
      },
    });
  };

  // Generate updated salary data
  const handleSalaryUpdate = (userId) => {
    const user = allUsers.find((user) => user._id === userId);
    const wage = parseFloat(employeeData[userId]?.wage || 0);
    const presentDays = parseInt(employeeData[userId]?.presentDays || 0);
    const salary = calculateSalary(wage, presentDays);

    setUpdatedSalaries((prevData) => [
      ...prevData,
      {
        name: user.firstName,
        employeeCode: user.employeeCode,
        wage: wage,
        presentDays: presentDays,
        salary: salary,
      },
    ]);
  };

  // Export salary data to CSV
  const exportToCSV = () => {
    const data = updatedSalaries.map((entry) => ({
      Name: entry.name,
      Emp_Code: entry.employeeCode,
      Wage: entry.wage,
      Present_Days: entry.presentDays,
      Salary: entry.salary,
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        ["Name", "Emp_Code", "Wage", "Present_Days", "Salary"].join(","),
        ...data.map((item) => Object.values(item).join(",")),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, "salary_report.csv");
  };

  return (
    <div>
      <MainDashboard />
      <h1 className="text-center text-lg font-bold p-5">Salary Management</h1>
      <div className="overflow-x-auto ml-[5rem]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Full Name</th>
              <th className="px-6 py-3">Emp-code</th>
              <th className="px-6 py-3">New Wage</th>
              <th className="px-6 py-3">Present Days</th>
              <th className="px-6 py-3">Calculated Salary</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length > 0 ? (
              allUsers.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {user.firstName}
                  </td>
                  <td className="px-6 py-4">{user.employeeCode}</td>
                  <td className="px-6 py-4">
                    <TextField
                      variant="outlined"
                      size="small"
                      name="wage"
                      value={employeeData[user._id]?.wage || ""}
                      onChange={(e) => handleWageChange(e, user._id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <TextField
                      variant="outlined"
                      size="small"
                      name="presentDays"
                      value={employeeData[user._id]?.presentDays || ""}
                      onChange={(e) => handleWageChange(e, user._id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    {employeeData[user._id]?.wage &&
                    employeeData[user._id]?.presentDays
                      ? calculateSalary(
                          parseFloat(employeeData[user._id]?.wage),
                          parseInt(employeeData[user._id]?.presentDays)
                        )
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSalaryUpdate(user._id)}
                    >
                      Update Salary
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-4 text-center">
          <Button
            variant="contained"
            color="success"
            onClick={exportToCSV}
            disabled={updatedSalaries.length === 0}
          >
            Download Salary Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmpSalaryManagement;
