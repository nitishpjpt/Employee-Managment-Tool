import React, { useContext } from "react";
import MainDashboard from "../pages/MainDashboard";
import { EmployeeContext } from "../context/EmployeeContext";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const Termination = () => {
  const { employees, setEmployees } = useContext(EmployeeContext);

  const terminateEmployee = async (employeeId) => {
    console.log(employeeId);
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user//terminate/${employeeId}`
      );

      // Update the employees state to reflect the change
      setEmployees((prev) =>
        prev.map((employee) =>
          employee._id === employeeId
            ? { ...employee, status: "terminated" }
            : employee
        )
      );

      toast.success("Employee terminated successfully!");
    } catch (error) {
      console.error("Error terminating employee:", error);
      toast.error("Failed to terminate the employee.");
    }
  };

  return (
    <>
      <MainDashboard />
      <div>
        <div className="relative overflow-x-auto pt-6 lg:ml-[15rem] xs:ml-[4rem] p-2 max-w-7xl">
          <h1 className="text-center pb-4 font-semibold text-2xl text-gray-800">
            Employee Details
          </h1>
          <div className=" bg-white shadow-md rounded-lg">
            <table className="w-full overflow-x-auto  text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Full Name</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Emp-code</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Terminate</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((user) => (
                    <tr
                      key={user._id}
                      className="bg-white border-b transition-all"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-6 py-4">{user.department}</td>
                      <td className="px-6 py-4">{user.role}</td>
                      <td className="px-6 py-4">{user.employeeCode}</td>
                      <td className="px-6 py-4">{user.salary}</td>
                      <td className="px-6 py-4">
                        {user.Empstatus === "terminated" ? "Terminated" : "Active"}
                      </td>
                      <td className="px-6 py-4">
                        {user.Empstatus !== "terminated" && (
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => terminateEmployee(user._id)}
                          >
                            Terminate
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
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
      </div>
    </>
  );
};

export default Termination;