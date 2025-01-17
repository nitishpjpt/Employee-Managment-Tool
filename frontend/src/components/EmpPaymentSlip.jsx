import React, { useEffect, useState } from "react";
import EmpDashboard from "../pages/EmpDashboard";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

const EmpPaymentSlip = () => {
  const [employee, setEmployee] = useState(null);

  const companyDetails = {
    name: "Deepnap Softech",
    address: "5E 12/BP N.I.T Faridabad (121001)",
  };

  const FUND_PERCENTAGE = 12; // Percentage of salary allocated to the fund

  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const userData = parsedUser.data.userResponse;

      // Calculate working days and fund
      const presentDays = userData.attendance
        ? userData.attendance.filter((att) => att.status === "Present").length
        : 0;

      const fund = (userData.salary * FUND_PERCENTAGE) / 100;

      const totalSalary = userData.salary - fund;
      console.log(totalSalary);

      setEmployee({ ...userData, workingDays: presentDays, fund, totalSalary });
    }
  }, []);

  const exportToPDF = () => {
    if (!employee) return;

    const doc = new jsPDF();

    // Add company details in the header
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
      "Total Salary",
    ];
    const tableRow = [
      `${employee.firstName} ${employee.lastName}`,
      employee.email,
      employee.department,
      employee.role,
      employee.salary.toFixed(2),
      employee.workingDays,
      employee.fund.toFixed(2),
      employee.totalSalary.toFixed(2),
    ];

    // Add table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: [tableRow],
      startY: 50,
    });

    // Save the PDF
    doc.save("Employee_Payslip.pdf");
  };

  return (
    <>
      <EmpDashboard />
      <div className=" p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold">Payroll Summary</h2>
          </div>

          {employee ? (
            <div className="bg-white shadow-md rounded-lg p-4 mt-6 overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 overflow-x-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 overflow-x-auto">
                  <tr>
                    <th className="px-6 py-3">Full Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Department</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Actual Salary</th>
                    <th className="px-6 py-3">Working Days</th>
                    <th className="px-6 py-3">Fund (12%)</th>
                    <th className="px-6 py-3">Total Salary</th>
                    <th className="px-6 py-3">Generate Payslip</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">
                      {employee.firstName} {employee.lastName}
                    </td>
                    <td className="px-6 py-4">{employee.email}</td>
                    <td className="px-6 py-4">{employee.department}</td>
                    <td className="px-6 py-4">{employee.role}</td>
                    <td className="px-6 py-4">{employee.salary.toFixed(2)}</td>
                    <td className="px-6 py-4">{employee.workingDays}</td>
                    <td className="px-6 py-4">{employee.fund.toFixed(2)}</td>
                    <td className="px-6 py-4">{employee.totalSalary}</td>
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
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-6">
              No employee data available.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmpPaymentSlip;
