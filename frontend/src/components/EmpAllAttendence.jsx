import React, { useContext, useState } from "react";
import MainDashboard from "../pages/MainDashboard.jsx";
import { EmployeeContext } from "../context/EmployeeContext.jsx";
import { Button } from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, isSameMonth } from "date-fns";
import * as XLSX from "xlsx";

const EmpAllAttendence = () => {
  const { employees } = useContext(EmployeeContext);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to current date

  // Filter employees by the selected month
  const filteredEmployees = employees.filter((employee) =>
    employee.attendance?.some((att) =>
      isSameMonth(new Date(att.date), selectedDate)
    )
  );

  // Export to Excel
  const handleExport = () => {
    const exportData = filteredEmployees.map((item) => {
      const presentDays =
        item.attendance?.filter(
          (att) =>
            att.status === "Present" &&
            isSameMonth(new Date(att.date), selectedDate)
        ).length || 0;

      const absentDays =
        item.attendance?.filter(
          (att) =>
            att.status === "Absent" &&
            isSameMonth(new Date(att.date), selectedDate)
        ).length || 0;

      return {
        Name: `${item.firstName} ${item.lastName}`,
        Location: item.location,
        Department: item.department,
        Role: item.role,
        Salary: item.salary,
        "Present Days": presentDays,
        "Absent Days": absentDays,
        "Total Active Time": item.formattedTotalActiveTime,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(
      workbook,
      `Attendance_${format(selectedDate, "MMMM_yyyy")}.xlsx`
    );
  };

  return (
    <div>
      <MainDashboard />

      {/* Header */}
      <div className="flex justify-between items-center px-4 pt-6 ml-[14rem]">
        <h1 className="text-2xl ml-[7rem] font-bold">
          All Employee Attendance
        </h1>
        <div className="flex items-center gap-4">
          <label htmlFor="month-picker" className="text-gray-700">
            Filter by Month:
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            className="border rounded-lg px-2 py-1"
          />
        </div>
      </div>

      {/* Attendance Table */}
      <div className="relative ml-[14rem] overflow-x-auto pt-10 px-4 sm:px-6 lg:px-8 p-4">
        <table className="w-full bg-white text-sm text-left text-gray-600 rounded-lg shadow-lg">
          <thead className="text-xs uppercase bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">Name</th>

              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Salary</th>
              <th className="px-6 py-3">Present Days</th>
              <th className="px-6 py-3">Absent Days</th>

              <th className="px-6 py-3 text-right">
                <Button
                  onClick={handleExport}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  Export
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((item, index) => {
                const presentDays =
                  item.attendance?.filter(
                    (att) =>
                      att.status === "Present" &&
                      isSameMonth(new Date(att.date), selectedDate)
                  ).length || 0;

                const absentDays =
                  item.attendance?.filter(
                    (att) =>
                      att.status === "Absent" &&
                      isSameMonth(new Date(att.date), selectedDate)
                  ).length || 0;

                return (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.firstName} {item.lastName}
                    </td>

                    <td className="px-6 py-4">{item.department}</td>
                    <td className="px-6 py-4">{item.role}</td>
                    <td className="px-6 py-4">{item.salary}</td>
                    <td className="px-6 py-4">{presentDays} </td>
                    <td className="px-6 py-4">{absentDays}</td>
                    <td className="px-6 py-4"></td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  No attendance data found for the selected month
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpAllAttendence;