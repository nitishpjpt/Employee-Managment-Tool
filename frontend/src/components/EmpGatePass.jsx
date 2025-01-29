import { useEffect, useState } from "react";
import axios from "axios";
import EmpDashboard from "../pages/EmpDashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmpGatePass = () => {
  const [reason, setReason] = useState("");
  const [logoutTime, setLogoutTime] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all previous gate pass requests
  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const employeeId = parsedUser.data.userResponse._id;

      axios
        .get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/user/employee/gatepass/all/${employeeId}`
        )
        .then((res) => {
          setRequests(res.data.gatePassRequests);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching gate pass requests:", error);
          setLoading(false);
        });
    }
  }, []);

  // Submit a new gate pass request
  const requestGatePass = async () => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const employeeId = parsedUser.data.userResponse._id;

      try {
        // Send request to the backend
        const response = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/user/employee/gatepass/request`,
          {
            reason,
            logoutTime,
            employeeId, // Pass employeeId here
          }
        );

        // Add the new request to the state immediately after submission
        setRequests((prevRequests) => [
          ...prevRequests,
          response.data.newRequest, // Assuming the backend sends back the newly created request
        ]);

        // Clear input fields after submission
        setReason("");
        setLogoutTime("");
        toast.success("Gate Pass request send for approval!", {
          position: "top-right",
          autoClose: 1000,
        });
      } catch (error) {
        console.error("Error requesting gate pass:", error);
        toast.error(
          error.response.data.message || "Advanced request does not send.",
          {
            position: "top-right",
            autoClose: 1000,
          }
        );
      }
    } else {
      console.error("Employee data not found in localStorage");
    }
  };

  return (
    <>
      <EmpDashboard />
      <div className="p-6 max-w-2xl mx-auto space-y-8">
        <div className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold">Gate Pass Request</h2>
        </div>

        {/* Request Gate Pass Form */}
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Request New Gate Pass
          </h3>
          <div className="space-y-4">
            <input
              required
              type="text"
              placeholder="Enter reason for leaving"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              required
              type="time"
              value={logoutTime}
              onChange={(e) => setLogoutTime(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={requestGatePass}
              className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Request Gate Pass
            </button>
          </div>
        </div>

        {/* Display Previous Requests */}
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-700">
            Previous Requests
          </h3>
          {loading ? (
            <p className="text-center text-gray-500">
              Loading previous requests...
            </p>
          ) : requests.length === 0 ? (
            <p className="text-center text-gray-500">
              No previous requests found.
            </p>
          ) : (
            requests.map((pass) => (
              <div
                key={pass._id}
                className="border-b border-gray-200 py-4 flex justify-between items-center"
              >
                <div className="flex flex-col space-y-2">
                  <p className="font-semibold text-gray-700">{pass.reason}</p>
                  <p className="text-sm text-gray-500">
                    <strong>Logout Time:</strong> {pass.logoutTime}
                  </p>
                  {pass.nextLoginTime && (
                    <p className="text-sm text-gray-500">
                      <strong>Next Login:</strong> {pass.nextLoginTime}
                    </p>
                  )}
                </div>
                <span
                  className={`px-4 py-2 text-sm font-semibold rounded-full ${
                    pass.status === "Approved"
                      ? "bg-green-500 text-white"
                      : pass.status === "Rejected"
                      ? "bg-red-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {pass.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default EmpGatePass;
