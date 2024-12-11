import React from "react";
import MainDashboard from "../pages/MainDashboard";
import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";

const Reports = () => {
  const { employees } = useContext(EmployeeContext);

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
      Report: employee.role || "",
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
      <div>
        <MainDashboard />
        {/*--------Table-------------*/}
        <div>
          <div class="relative overflow-x-auto ml-[5rem] pt-10">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Full Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Department
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" class="px-6 py-3">
                               {/* Export Button */}
            <Button onClick={exportToExcel} variant="contained">
              Export
            </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((item, index) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.firstName} {item.lastName}
                      </th>
                      <td class="px-6 py-4">{item.email}</td>
                      <td class="px-6 py-4">{item.location}</td>
                      <td class="px-6 py-4">{item.department}</td>
                      <td class="px-6 py-4">{item.role}</td>
                      <td class="px-6 py-4">not found</td>

                      <td
                        class="px-6 py-4"
                        className="flex justify-center gap-1 items-center py-8"
                      ></td>
                    </tr>
                  ))
                ) : (
                  <h1>not data found</h1>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
