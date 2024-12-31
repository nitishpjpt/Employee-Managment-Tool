import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { saveAs } from "file-saver";
import MainDashboard from "../pages/MainDashboard.jsx";

const EmpSalaryManagement = () => {
  const [allUsers, setAllUsers] = useState([]); // Use allUsers for the data
  const [employeeData, setEmployeeData] = useState({});
  const [updatedSalaries, setUpdatedSalaries] = useState([]);
  const [companyTotalActiveTime, setCompanyTotalActiveTime] = useState(0); // New state for company total active time

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

  // Calculate salary based on wages, present days, and active time
  const calculateSalary = (wage, presentDays, activeTimeEmployee, activeTimeCompany) => {
    if (activeTimeCompany > 0) {
      return (wage * presentDays) * (activeTimeEmployee / activeTimeCompany); // Adjust salary based on active time
    }
    return 0; // Return 0 if no company active time
  };

  // Update the wage, active time, or present days of an employee
  const handleChange = (e, userId, field) => {
    const { value } = e.target;
    setEmployeeData({
      ...employeeData,
      [userId]: {
        ...employeeData[userId],
        [field]: value,
      },
    });
  };

  // Update company total active time
  const handleCompanyTotalTimeChange = (e) => {
    setCompanyTotalActiveTime(e.target.value);
  };

  // Generate updated salary data for each employee
  const handleSalaryUpdate = (userId) => {
    const user = allUsers.find((user) => user._id === userId);
    const wage = parseFloat(employeeData[userId]?.wage || 0);
    const presentDays = parseInt(employeeData[userId]?.presentDays || 0);
    const activeTimeEmployee = parseInt(employeeData[userId]?.activeTime || 0); // Get active time for the employee

    const salary = calculateSalary(wage, presentDays, activeTimeEmployee, companyTotalActiveTime);

    setUpdatedSalaries((prevData) => [
      ...prevData,
      {
        name: user.firstName,
        employeeCode: user.employeeCode,
        wage: wage,
        presentDays: presentDays,
        activeTime: activeTimeEmployee,
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
      Active_Time: entry.activeTime,
      Salary: entry.salary,
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        ["Name", "Emp_Code", "Wage", "Present_Days", "Active_Time", "Salary"].join(","),
        ...data.map((item) => Object.values(item).join(",")),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, "salary_report.csv");
  };

  return (
    <div>
      <MainDashboard />
      <h1 className="text-center text-lg font-bold p-5">Salary Management</h1>
      <div className="overflow-x-auto ml-[15rem]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Full Name</th>
              <th className="px-6 py-3">Emp-code</th>
              <th className="px-6 py-3">New Wage</th>
              <th className="px-6 py-3">Present Days</th>
              <th className="px-6 py-3">Active Time</th>
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
                      onChange={(e) => handleChange(e, user._id, "wage")}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <TextField
                      variant="outlined"
                      size="small"
                      name="presentDays"
                      value={employeeData[user._id]?.presentDays || ""}
                      onChange={(e) => handleChange(e, user._id, "presentDays")}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <TextField
                      variant="outlined"
                      size="small"
                      name="activeTime"
                      value={employeeData[user._id]?.activeTime || ""}
                      onChange={(e) => handleChange(e, user._id, "activeTime")}
                    />
                  </td>
                  <td className="px-6 py-4">
                    {employeeData[user._id]?.wage &&
                    employeeData[user._id]?.presentDays &&
                    employeeData[user._id]?.activeTime
                      ? calculateSalary(
                          parseFloat(employeeData[user._id]?.wage),
                          parseInt(employeeData[user._id]?.presentDays),
                          parseInt(employeeData[user._id]?.activeTime),
                          companyTotalActiveTime
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
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
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

        {/* Adjust Company Active Time */}
        <div className="mt-4 text-center">
          <TextField
            label="Adjust Company Total Active Time"
            type="number"
            value={companyTotalActiveTime}
            onChange={handleCompanyTotalTimeChange}
            variant="outlined"
            size="small"
          />
        </div>
      </div>
    </div>
  );
};

export default EmpSalaryManagement;
