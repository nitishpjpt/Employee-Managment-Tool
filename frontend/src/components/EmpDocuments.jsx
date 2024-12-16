import React, { useState } from "react";
import EmpDashboard from "../pages/EmpDashboard";
import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { useEffect } from "react";

const EmpDocuments = () => {
  // state for the login user
  const [user, setUser] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [backgroundDetails, setBackgroundDetails] = useState("");

  // local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser.data);
        setBankDetails(parsedUser.data.bankVerification);
        setBackgroundDetails(parsedUser.data.backgroundVerification);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

  return (
    <>
      <EmpDashboard />

      {/* Table */}
      <div className="relative pt-4 ">
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
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.firstName}
              </td>
              <td className="px-6 py-4">{user.email}</td>
              {/* Background Verification Fields */}
              <td className="px-6 py-4">{backgroundDetails.addhar}</td>
              <td className="px-6 py-4">{backgroundDetails.pan}</td>
              <td className="px-6 py-4">{backgroundDetails.driving}</td>
              <td className="px-6 py-4">{backgroundDetails.voterCard}</td>

              {/* Bank Verification Fields */}
              <td className="px-6 py-4">{bankDetails.accountName}</td>
              <td className="px-6 py-4">{bankDetails.accountNumber}</td>
              <td className="px-6 py-4">{bankDetails.holderName}</td>
              <td className="px-6 py-4">{bankDetails.ifscCode}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmpDocuments;
