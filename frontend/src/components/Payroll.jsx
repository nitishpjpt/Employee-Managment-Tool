import React, { useContext } from "react";
import MainDashboard from "../pages/MainDashboard";
import { EmployeeContext } from "../context/EmployeeContext";

const Payroll = () => {
  const { employees } = useContext(EmployeeContext);

  console.log(employees);

  return (
    <>
      <MainDashboard />
      <div className="ml-[15rem] p-6 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Payroll Summary</h2>
          </div>

          {employees.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {employees.map((employee, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between"
                >
                  {/* Employee Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {employee.firstName}
                    </h3>
                    <p className="text-gray-500">{employee.role}</p>
                  </div>

                  {/* Salary Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Basic Salary</p>
                      <p className="font-medium">₹ {employee.salary}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Bonuses</p>
                      <p className="font-medium text-green-600">₹ 5,000</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Deductions</p>
                      <p className="font-medium text-red-600">₹ 2,000</p>
                    </div>
                  </div>

                  <hr className="my-4" />

                  {/* Net Pay */}
                  <div className="flex justify-between text-lg font-bold">
                    <p>Net Pay</p>
                    <p>₹ {employee.salary}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-center text-gray-600 mt-6">
              Employees not found
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Payroll;
