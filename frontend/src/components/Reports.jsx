import React from "react";
import MainDashboard from "../pages/MainDashboard";
import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";
import { useState } from "react";

const Reports = () => {
  const { employees } = useContext(EmployeeContext);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

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
      Location: employee.location || "",
      Department: employee.department || "",
      Role: employee.role || "",
      Salary: employee.salary || "",
      PresentDays: employee.attendance,
      Total: employee.formattedTotalActiveTime || "",
    }));

    // Create a worksheet and a workbook
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TimeSheet Data");

    // Download the Excel file
    XLSX.writeFile(workbook, "TimeSheetData.xlsx");
  };

  const handleViewLocation = (location) => {
    setSelectedLocation(location);
    setLocationModalVisible(true);
  };

  return (
    <>
      <div>
        <MainDashboard />
        {/*--------Table-------------*/}
        <div>
          <div class="relative lg:ml-[14rem] xs:ml-[5rem] overflow-x-auto pt-10 px-4 sm:px-6 lg:px-8 p-4 min-h-screen bg-gray-100">
            <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">Employees Report</h2>
            </div>
            <table class="w-full  p-4 bg-white text-sm text-left text-gray-600 dark:text-gray-400 border-collapse rounded-lg shadow-lg">
              <thead class="text-xs uppercase bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 border-b dark:border-gray-600"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 border-b dark:border-gray-600"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 border-b dark:border-gray-600"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 border-b dark:border-gray-600"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 border-b dark:border-gray-600"
                  >
                    Salary
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 border-b dark:border-gray-600"
                  >
                    Present Days
                  </th>

                  <th scope="col" class="px-6 py-3 text-right">
                    <Button
                      onClick={exportToExcel}
                      variant="contained"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Export
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((item, index) => (
                    <tr
                      class={`${
                        index % 2 === 0
                          ? "bg-gray-50 dark:bg-gray-800"
                          : "bg-white dark:bg-gray-700"
                      } hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {item.firstName}
                      </th>
                      <td class="px-6 py-4">
                        <button
                          className="text-blue-500"
                          onClick={() => handleViewLocation(item.location)}
                        >
                          View Location
                        </button>
                      </td>
                      <td class="px-6 py-4">{item.department}</td>
                      <td class="px-6 py-4">{item.role}</td>
                      <td class="px-6 py-4">{item.salary}</td>
                      <td class="px-6 py-4">
                        {item.attendance?.filter(
                          (att) => att.status === "Present"
                        ).length || 0}
                      </td>

                      <td class="px-6 py-4"></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      class="text-center py-6 text-gray-500 dark:text-gray-300"
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Location Modal */}
      {locationModalVisible && (
        <div className="xs:pl-[4rem] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Employee Location
            </h3>
            <p className="text-gray-600">{selectedLocation}</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setLocationModalVisible(false)}
                className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reports;
