import React from "react";
import EmpDashboard from "../pages/EmpDashboard";
import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";

const EmpDocuments = () => {
  const { employees } = useContext(EmployeeContext);

  return (
    <>
      <EmpDashboard />

      {/* Table */}
      <div className="relative pt-4 shadow-lg">
        <table className="w-full  text-sm  text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email-id</th>
              <th className="px-6 py-3">Addhar number</th>
              <th className="px-6 py-3">Pan Number</th>
              <th className="px-6 py-3">Driving Licence</th>
              <th className="px-6 py-3">Voter Card</th>
              <th className="px-6 py-3">Account Name</th>
              <th className="px-6 py-3">Account Number</th>
              <th className="px-6 py-3">Holder Name</th>
              <th className="px-6 py-3">IFSC Code</th>
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
                  <td className="px-6 py-4">{employee.email ?? ""}</td>
                  {/* Background Verification Fields */}
                  <td className="px-6 py-4">
                    {employee.backgroundVerification?.addhar ?? ""}
                  </td>
                  <td className="px-6 py-4">
                    {employee.backgroundVerification?.pan ?? ""}
                  </td>
                  <td className="px-6 py-4">
                    {employee.backgroundVerification?.driving ?? ""}
                  </td>
                  <td className="px-6 py-4">
                    {employee.backgroundVerification?.voterCard ?? ""}
                  </td>
                  {/* Bank Verification Fields */}
                  <td className="px-6 py-4">
                    {employee.bankVerification?.accountName ?? ""}
                  </td>
                  <td className="px-6 py-4">
                    {employee.bankVerification?.accountNumber ?? ""}
                  </td>
                  <td className="px-6 py-4">
                    {employee.bankVerification?.holderName ?? ""}
                  </td>
                  <td className="px-6 py-4">
                    {employee.bankVerification?.ifscCode ?? ""}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
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

export default EmpDocuments;
