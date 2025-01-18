import React, { useContext, useEffect, useState } from "react";
import MainDashboard from "../pages/MainDashboard";
import { EmployeeContext } from "../context/EmployeeContext";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

const EmpPayslip = () => {
  const [employeesWithDetails, setEmployeesWithDetails] = useState([]);
  const { employees } = useContext(EmployeeContext);

  const companyDetails = {
    name: "Deepnap Softech",
    address: "5E 12/BP N.I.T Faridabad(121001)",
  };

  const FUND_PERCENTAGE = 12; // Percentage of salary allocated to the fund

  useEffect(() => {
    if (employees && employees.length > 0) {
      // Map through employees to calculate working days and fund
      const updatedEmployees = employees.map((employee) => {
        const presentDays = employee.attendance
          ? employee.attendance.filter((att) => att.status === "Present").length
          : 0;

        const fund = (employee.salary * FUND_PERCENTAGE) / 100;

        console.log(fund);
        return { ...employee, workingDays: presentDays, fund };
      });

      setEmployeesWithDetails(updatedEmployees);
    }
  }, [employees]);

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Add company name and address in the header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(companyDetails.name, 14, 20);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(companyDetails.address, 14, 28);

    // Add a title
    doc.setFontSize(14);
    doc.text("Employee Payslip Information", 14, 40);

    // Define table columns and rows
    const tableColumn = [
      "Full Name",
      "Email",
      "Department",
      "Role",
      "Actual Salary",
      "Working Days",
      "Fund (12%)",
    ];
    const tableRows = employeesWithDetails.map((emp) => [
      `${emp.firstName} ${emp.lastName}`,
      emp.email,
      emp.department,
      emp.role,
      emp.salary.toFixed(2),
      emp.workingDays,
      emp.fund.toFixed(2),
    ]);

    // Add table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
    });

    // Save the PDF
    doc.save("Payslip_Info.pdf");
  };

  return (
    <>
      <MainDashboard />
      <div className="relative min-h-screen overflow-x-auto pt-6 lg:ml-[15rem] xs:ml-[4rem] p-2 max-w-7xl bg-gray-100">
        <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Generate Employee Payslip</h2>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
          <div className="mb-4 flex justify-end">
            <Button variant="contained" color="primary" onClick={exportToPDF}>
              Export to PDF
            </Button>
          </div>
          <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 overflow-x-auto ">
              <tr>
                <th className="px-6 py-3">Full Name</th>

                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Actual Salary</th>
                <th className="px-6 py-3">Working Days</th>
                <th className="px-6 py-3">Fund (12%)</th>
                <th className="px-6 py-3">Generate Payslip</th>
              </tr>
            </thead>
            <tbody>
              {employeesWithDetails.length > 0 ? (
                employeesWithDetails.map((user, index) => (
                  <tr
                    key={index}
                    className={`border-b transition-all ${
                      user.Empstatus === "terminated"
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">
                      {user.firstName} {user.lastName}
                    </td>

                    <td className="px-6 py-4">{user.department}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.salary.toFixed(2)}</td>
                    <td className="px-6 py-4">{user.workingDays}</td>
                    <td className="px-6 py-4">{user.fund.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <Button
                        onClick={exportToPDF}
                        variant="contained"
                        color="success"
                        size="small"
                      >
                        Payslip
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No data available
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

export default EmpPayslip;
