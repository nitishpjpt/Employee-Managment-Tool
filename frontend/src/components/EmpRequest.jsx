import React, { useEffect, useState } from "react";
import EmpDashboard from "../pages/EmpDashboard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmpRequest = () => {
  // State for the request leave page
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [halfLeave, setHalfLeave] = useState("");
  const [fullLeave, setFullLeave] = useState("");
  const [leaveType, setLeaveType] = useState(""); // State for leave type
  const [username, setUserName] = useState("");

  // State to store employee id
  const [employeeId, setEmployeeId] = useState("");

  // useEffect to get employee id from the localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      try {
        var parsedUser = JSON.parse(storedUser);
        console.log(parsedUser.data._id);
        setUserName(parsedUser.data.firstName);
        setEmployeeId(parsedUser.data._id);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

  // Function for form handler
  const submitHandler = async (e) => {
    e.preventDefault();

    // Create the leaveObj inline
    const leaveObj = {
      fromDate,
      toDate,
      halfLeave: halfLeave === "halfday" ? halfLeave : undefined,
      fullLeave,
      leaveType,
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/${employeeId}/request/leave`,
        leaveObj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Store user data in local storage
      localStorage.setItem("reqLeave", JSON.stringify(response.data));

      console.log(response.data);
      toast.success("Request leave submitted successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error submitting leave request:", error);
      toast.error("Request leave submission failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // local storage

  return (
    <>
      <ToastContainer />
      <EmpDashboard />
      <div className="max-w-2xl mx-auto shadow-lg p-12 mt-[6rem]">
        <h1 className="pb-10 flex justify-center items-center gap-2 font-bold">
          Request Leave <h1 className="text-gray-400">{username}</h1>
        </h1>
        <form onSubmit={submitHandler}>
          <div className="grid gap-6 mb-6 lg:grid-cols-2">
            <div>
              <label
                htmlFor="fromDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                From Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="fromDate"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="toDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                To Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="toDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="halfLeave"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Request leave for half day <br></br>{" "}
                <span className="text-gray-400">
                  You can get only 5 half days
                </span>
              </label>
              <input
                type="checkbox"
                id="halfLeave"
                className="mr-2"
                onChange={(e) =>
                  setHalfLeave(e.target.checked ? "halfday" : "")
                }
              />
              <span className="text-gray-900 dark:text-gray-300">Half Day</span>
            </div>

            <div>
              <label
                htmlFor="leaveType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Leave Type<span className="text-red-500">*</span>
              </label>
              <select
                id="leaveType"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => setLeaveType(e.target.value)}
              >
                <option value="">Select Leave Type</option>
                <option value="sick">Sick Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="emergency">Emergency Leave</option>
                <option value="vacation">Vacation</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="fullLeave"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Reason for leave
            </label>
            <textarea
              id="fullLeave"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              cols={53}
              rows={4}
              placeholder="Write Reason Here..."
              onChange={(e) => setFullLeave(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 mt-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default EmpRequest;
