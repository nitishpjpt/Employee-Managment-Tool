import React from "react";
import MainDashboard from "../pages/MainDashboard";
import { EmployeeContext } from "../context/EmployeeContext";
import { useContext } from "react";
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";

const TimeSheet = () => {
  const { employees } = useContext(EmployeeContext);
  console.log(employees);

  // Function to export table data to Excel
  const exportToExcel = () => {
    if (employees.length === 0) {
      alert("No data to export");
      return;
    }

    // Map employee data for Excel
    const formattedData = employees.map((employee) => ({
      Name: employee.firstName || "",
      Email: employee.email || "",
      "Employee Code": employee.employeeCode || "",
      Location: employee.location || "",
      Department: employee.department || "",
      "Clock-In": employee.clockIn || "",
      "Clock-Out": employee.clockOut || "",
      "Total Hour": employee.totalHour || "",
      "Office Hour": employee.officeHour || "",
      "Active Hour": employee.activeHour || "",
      Productive: employee.productive || "",
      Unproductive: employee.unproductive || "",
      Neutral: employee.neutral || "",
      Idle: employee.idle || "",
      "Offline Hours": employee.offlineHours || "",
      Break: employee.break || "",
      Productivity: employee.productivity || "",
    }));

    // Create a worksheet and a workbook
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TimeSheet Data");

    // Download the Excel file
    XLSX.writeFile(workbook, "TimeSheetData.xlsx");
  };

  return (
    <>
      <MainDashboard />

      {/* Select Options */}
      <div className="shadow-lg ">
        <form className="max-w-sm lg:mx-[15rem] md:mx-auto flex lg:flex-row md:flex-col sm:flex-col lg:gap-10">
          <label
            htmlFor="small"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Location
          </label>
          <select
            id="small"
            className="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a Location</option>
            <option value="US">Delhi</option>
            <option value="CA">Noida</option>
            <option value="FR">Gurugram</option>
            <option value="DE">Noida</option>
          </select>

          <label
            htmlFor="default"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Department
          </label>
          <select
            id="default"
            className="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a department</option>
            <option value="US">IT Manager</option>
            <option value="CA">IT Director</option>
            <option value="FR">CTO</option>
            <option value="DE">CIO</option>
          </select>
          {/* Export Button */}
          <Button onClick={exportToExcel} variant="contained">
            Export
          </Button>
        </form>
        {/* Export Button */}
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto ml-[5rem] pt-10">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>

              <th className="px-6 py-3">Employee Code</th>

              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Clock-in</th>
              <th className="px-6 py-3">Clock-out</th>
              <th className="px-6 py-3">Total Hour</th>

              <th className="px-6 py-3">Active Hour</th>
              <th className="px-6 py-3 text-[#35A745]">Productive</th>
              <th className="px-6 py-3 text-red-500">Unproductive</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {employee.firstName ?? ""}
                  </td>

                  <td className="px-6 py-4">{employee.employeeCode ?? ""}</td>

                  <td className="px-6 py-4">{employee.department ?? ""}</td>
                  <td className="px-6 py-4">
                    {" "}
                    {employee.lastLoginTime ?? ""}{" "}
                  </td>
                  <td className="px-6 py-4">{employee.logoutTime ?? ""} </td>
                  <td className="px-6 py-4">{employee.totalHour ?? ""}</td>

                  <td className="px-6 py-4">
                    {employee.formattedActiveTime ?? ""}
                  </td>
                  <td className="px-6 py-4">{employee.productive ?? ""}</td>
                  <td className="px-6 py-4">{employee.unproductive ?? ""}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="17"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TimeSheet;
