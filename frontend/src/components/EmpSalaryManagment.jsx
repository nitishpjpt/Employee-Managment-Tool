import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { saveAs } from "file-saver";
import MainDashboard from "../pages/MainDashboard.jsx";

// Function to calculate the number of days in the current month
const getDaysInMonth = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); // Get the last date of the current month
};

const EmpSalaryManagement = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [employeeData, setEmployeeData] = useState({});
  const [updatedSalaries, setUpdatedSalaries] = useState([]);
  const [companyTotalActiveHours, setCompanyTotalActiveHours] = useState(10); // Default to 10 hours per day

  // Calculate salary using actual days in the month
  const calculateSalary = (
    monthlySalary,
    presentDays,
    activeMinutes,
    companyActiveMinutes
  ) => {
    if (
      !monthlySalary ||
      !presentDays ||
      !activeMinutes ||
      !companyActiveMinutes
    )
      return 0;

    // Get the actual number of days in the current month
    const totalDaysInMonth = getDaysInMonth();

    // Calculate daily salary based on the actual days in the month
    const dailySalary = monthlySalary / totalDaysInMonth;

    // Calculate hourly salary (assuming 8 hours of work per day)
    const hourlySalary = dailySalary / 10;

    // Calculate the total salary based on active minutes worked (in hours)
    return parseFloat((hourlySalary * (activeMinutes / 60)).toFixed(2));
  };

  // Fetch all employees and initialize data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/user/employee/all/registerDetails`
        );
        const users = response.data.data.user || [];
        setAllUsers(users);

        const initialEmployeeData = {};
        users.forEach((user) => {
          const activeMinutes = convertFormattedTimeToMinutes(
            user.formattedTotalActiveTime
          );
          initialEmployeeData[user._id] = {
            monthlySalary: user.salary || 10000, // Default to 10,000 if no salary
            presentDays:
              user.attendance?.filter((att) => att.status === "Present")
                .length || 0,

            activeMinutes,
          };
        });
        setEmployeeData(initialEmployeeData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Helper function to convert formatted time (e.g., "5hr 30min") to minutes
  const convertFormattedTimeToMinutes = (formattedTime) => {
    if (!formattedTime) return 0;
    const [hours, minutes] = formattedTime
      .split(" ")
      .map((t) => parseInt(t.replace(/\D/g, ""), 10) || 0);
    return hours * 60 + minutes;
  };

  // Handle input changes for employees
  const handleChange = (e, userId, field) => {
    const { value } = e.target;
    setEmployeeData((prevData) => {
      const newData = {
        ...prevData,
        [userId]: {
          ...prevData[userId],
          [field]:
            field === "monthlySalary" ? parseFloat(value) : parseInt(value, 10),
        },
      };

      // Recalculate salary after presentDays or monthlySalary changes
      const updatedSalary = calculateSalary(
        newData[userId].monthlySalary,
        newData[userId].presentDays,
        newData[userId].activeMinutes,
        companyTotalActiveHours * 60 // Company active hours in minutes
      );

      // Update the salary in updatedSalaries state
      setUpdatedSalaries((prevSalaries) => [
        ...prevSalaries.filter(
          (entry) => entry.employeeCode !== prevData[userId].employeeCode
        ),
        {
          name: allUsers.find((user) => user._id === userId).firstName,
          employeeCode: allUsers.find((user) => user._id === userId)
            .employeeCode,
          salary: updatedSalary,
          presentDays: newData[userId].presentDays,
          activeTime: newData[userId].activeMinutes,
        },
      ]);
      return newData;
    });
  };

  // Handle company active hours change
  const handleCompanyTotalHoursChange = (e) => {
    setCompanyTotalActiveHours(parseFloat(e.target.value));
  };

  // Update salary for an employee
  const handleSalaryUpdate = (userId) => {
    const user = allUsers.find((user) => user._id === userId);
    const { monthlySalary, presentDays, activeMinutes } =
      employeeData[userId] || {};
    const companyActiveMinutes = companyTotalActiveHours * 60;

    const salary = calculateSalary(
      monthlySalary,
      presentDays,
      activeMinutes,
      companyActiveMinutes
    );

    setUpdatedSalaries((prevData) => [
      ...prevData.filter((entry) => entry.employeeCode !== user.employeeCode),
      {
        name: user.firstName,
        employeeCode: user.employeeCode,
        salary,
        presentDays,
        activeTime: activeMinutes,
      },
    ]);
  };

  // Export updated salaries to CSV
  const exportToCSV = () => {
    const data = updatedSalaries.map((entry) => ({
      Name: entry.name,
      Emp_Code: entry.employeeCode,
      Salary: entry.salary,
      Present_Days: entry.presentDays,
      Active_Time: `${Math.floor(entry.activeTime / 60)}hr ${
        entry.activeTime % 60
      }min`,
    }));

    const csvContent = [
      ["Name", "Emp_Code", "Salary", "Present_Days", "Active_Time"].join(","),
      ...data.map((item) => Object.values(item).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "salary_report.csv");
  };

  return (
    <div>
      <MainDashboard />
      <h1 className="text-center text-lg font-bold lg:p-5">Salary Management</h1>
      <div className="overflow-x-auto lg:ml-[15rem] xs:ml-[5rem]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Full Name</th>
              <th className="px-6 py-3">Emp-code</th>
              <th className="px-6 py-3">New Monthly Salary</th>
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
                      name="monthlySalary"
                      value={employeeData[user._id]?.monthlySalary || ""}
                      onChange={(e) =>
                        handleChange(e, user._id, "monthlySalary")
                      }
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
                    {`${Math.floor(
                      (employeeData[user._id]?.activeMinutes || 0) / 60
                    )}hr ${employeeData[user._id]?.activeMinutes % 60}min`}
                  </td>
                  <td className="px-6 py-4">
                    {calculateSalary(
                      employeeData[user._id]?.monthlySalary,
                      employeeData[user._id]?.presentDays,
                      employeeData[user._id]?.activeMinutes,
                      companyTotalActiveHours * 60
                    )}
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
        <div className="mt-4 text-center">
          <TextField
            label="Company Total Active Hours"
            type="number"
            value={companyTotalActiveHours}
            onChange={handleCompanyTotalHoursChange}
            variant="outlined"
            size="small"
          />
        </div>
      </div>
    </div>
  );
};

export default EmpSalaryManagement;
