import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MainDashboard from "../pages/MainDashboard";
import { EmployeeContext } from "../context/EmployeeContext";

const GatepassApproval = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { employees } = useContext(EmployeeContext);

  // Fetch all gate pass requests for all employees
  useEffect(() => {
    if (employees.length === 0) return;

    const fetchGatePassRequests = async () => {
      try {
        setLoading(true);
        const allRequests = [];

        const responses = await Promise.all(
          employees.map(async (employee) => {
            const res = await axios.get(
              `${
                import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
              }/api/v1/user/employee/gatepass/all/${employee._id}`
            );
            return res.data.gatePassRequests.map((req) => ({
              ...req,
              employeeId: employee._id, // Attach employee ID
              employeeName: employee.firstName, // Attach employee name
              employeeCode: employee.employeeCode,
            }));
          })
        );

        responses.forEach((reqList) => {
          allRequests.push(...reqList);
        });

        setRequests(allRequests);
      } catch (error) {
        console.error("Error fetching gate pass requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGatePassRequests();
  }, [employees]);

  // Handle Approve/Reject Request
  const handleApproval = async (employeeId, gatePassId, status) => {
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/gatepass/${employeeId}/approve`,
        { gatePassId, status }
      );

      // Update UI instantly
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === gatePassId ? { ...req, status } : req
        )
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Error approving/rejecting gate pass:", error);
    }
  };

  return (
    <>
      <MainDashboard />
      <div className="relative min-h-screen overflow-x-auto pt-6 lg:ml-[15rem] xs:ml-[4rem] p-4 max-w-7xl bg-gray-100">
        <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Employee Gate Pass Requests</h2>
        </div>

        {loading ? (
          <div className="text-center py-6 text-lg font-semibold text-gray-600">
            Loading...
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-6 text-lg font-semibold text-gray-600">
            No requests found.
          </div>
        ) : (
          <div className="space-y-6">
            {requests
              .reduce((acc, request) => {
                const existingEmployee = acc.find(
                  (employee) => employee.employeeId === request.employeeId
                );
                if (existingEmployee) {
                  existingEmployee.requests.push(request);
                } else {
                  acc.push({
                    employeeId: request.employeeId,
                    employeeName: request.employeeName,
                    employeeCode: request.employeeCode,
                    requests: [request],
                  });
                }
                return acc;
              }, [])
              .map((employee) => (
                <div
                  key={employee.employeeId}
                  className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
                >
                  <h3 className="text-xl font-bold text-blue-700 flex items-center">
                    <span className="mr-2"></span> {employee.employeeName} (
                    {employee.employeeCode})
                  </h3>

                  <div className="mt-4 space-y-4">
                    {employee.requests.map((request) => (
                      <div
                        key={request._id}
                        className="border rounded-lg p-4 bg-gray-50 hover:shadow-md transition"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-gray-800 font-medium">
                            📝 <span className="font-semibold">Reason:</span>{" "}
                            {request.reason}
                          </p>
                          <span
                            className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${
                              request.status === "Approved"
                                ? "bg-green-500"
                                : request.status === "Rejected"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            }`}
                          >
                            {request.status}
                          </span>
                        </div>

                        {/* Added Request Date Display */}
                        <p className="text-gray-600">
                          📅{" "}
                          <span className="font-semibold">Request Date:</span>{" "}
                          {new Date(request.requestedAt).toLocaleDateString()}
                        </p>

                        <p className="text-gray-600">
                          ⏳ <span className="font-semibold">Logout Time:</span>{" "}
                          {request.logoutTime}
                        </p>
                        <p className="text-gray-600">
                          🔄 <span className="font-semibold">Next Login:</span>{" "}
                          {request.nextLoginTime || "N/A"}
                        </p>

                        {request.status === "Pending" && (
                          <div className="mt-4 flex gap-3">
                            <button
                              onClick={() =>
                                handleApproval(
                                  request.employeeId,
                                  request._id,
                                  "Approved"
                                )
                              }
                              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                            >
                              ✅ Approve
                            </button>
                            <button
                              onClick={() =>
                                handleApproval(
                                  request.employeeId,
                                  request._id,
                                  "Rejected"
                                )
                              }
                              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                            >
                              ❌ Reject
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default GatepassApproval;
