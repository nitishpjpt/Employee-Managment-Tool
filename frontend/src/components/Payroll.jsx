import React, { useState, useEffect, useContext } from "react";
import MainDashboard from "../pages/MainDashboard";
import axios from "axios";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmployeeContext } from "../context/EmployeeContext";

const Payroll = () => {
  const { employees } = useContext(EmployeeContext);
  const [advanceRequests, setAdvanceRequests] = useState({});

  // Fetch advance requests for all employees
  useEffect(() => {
    const fetchAdvanceRequests = async () => {
      try {
        const requests = {};
        for (const employee of employees) {
          const response = await axios.get(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/api/v1/user/requests/advance/${employee._id}`
          );
          requests[employee._id] = response.data.advanceRequests;
        }
        setAdvanceRequests(requests);
      } catch (error) {
        console.error("Error fetching advance requests:", error);
        toast.error("Failed to load advance requests.");
      }
    };

    if (employees.length > 0) {
      fetchAdvanceRequests();
    }
  }, [employees]);

  // Approve an advance request
  const handleApproveRequest = async (employeeId, requestId) => {
    try {
      const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
      const response = await axios.put(
        `${baseUrl}/api/v1/user/request/advance/approve/${employeeId}/${requestId}`
      );
      toast.success("Advance request approved!");
      // Update the local state after approval
      setAdvanceRequests((prevRequests) => {
        return {
          ...prevRequests,
          [employeeId]: prevRequests[employeeId].map((req) =>
            req._id === requestId
              ? { ...req, status: "approved", responseDate: new Date() }
              : req
          ),
        };
      });
    } catch (error) {
      console.error("Error approving advance request:", error);
      toast.error("Failed to approve advance request.");
    }
  };

  return (
    <>
      <MainDashboard />
      <div className="lg:ml-[15rem] xs:ml-[2rem] xs:p-[2rem] p-6 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold">Payroll Summary</h2>
          </div>

          {employees.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {employees.map((employee) => {
                const requests = advanceRequests[employee._id] || [];
                return (
                  <div
                    key={employee._id}
                    className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between border-4 border-gray-200 hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Employee Info */}
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {employee.firstName} {employee.lastName}
                      </h3>
                      <p className="text-gray-500">{employee.role}</p>
                    </div>

                    {/* Salary Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <p>Basic Salary</p>
                        <p className="font-medium text-gray-800">
                          ₹ {employee.salary}
                        </p>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <p>Joining Date</p>
                        <p className="text-gray-500">
                          {dayjs(employee.date).format("DD MMM YYYY")}
                        </p>
                      </div>
                    </div>

                    <hr className="my-4" />

                    {/* Advanced Requests Section */}
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-gray-800">
                        Advance Requests
                      </h4>
                      {requests.length > 0 ? (
                        requests.map((req) => (
                          <div
                            key={req._id}
                            className="bg-gray-50 border rounded-lg p-4 mb-2 shadow-sm"
                          >
                            <p>
                              <strong>Amount:</strong> ₹ {req.amount}
                            </p>
                            <p>
                              <strong>Reason:</strong> {req.reason}
                            </p>
                            <p>
                              <strong>Status:</strong>{" "}
                              <span
                                className={
                                  req.status === "approved"
                                    ? "text-green-600"
                                    : req.status === "rejected"
                                    ? "text-red-600"
                                    : "text-yellow-600"
                                }
                              >
                                {req.status}
                              </span>
                            </p>
                            <p className="text-sm text-gray-500">
                              Requested on:{" "}
                              {dayjs(req.requestDate).format("DD MMM YYYY")}
                            </p>
                            {req.status === "pending" && (
                              <button
                                className="bg-green-600 text-white py-1 px-3 rounded-lg mt-2 hover:bg-green-700 transition-all"
                                onClick={() =>
                                  handleApproveRequest(employee._id, req._id)
                                }
                              >
                                Approve
                              </button>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No advance requests.</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h1 className="text-center text-gray-600 mt-6">
              No employees found.
            </h1>
          )}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Payroll;
