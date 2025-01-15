import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoEyeSharp } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEdit } from "react-icons/fa";

const EmployeeTable = () => {
  const [getallUser, setAllUser] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  // Fetch all employee details
  const getAllUserRegisterDetails = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/all/registerDetails`
      );
      setAllUser(response.data.data.user);
    } catch (error) {
      console.log("Error fetching registered users:", error);
    }
  };

  // Delete employee
  const deleteEmployee = async (employeeId) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/${employeeId}/delete`
      );
      if (response.status === 200) {
        setAllUser(getallUser.filter((user) => user._id !== employeeId));
        toast.success("Employee deleted successfully!", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Employee not deleted. Please try again.", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  // Open edit modal
  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setUpdatedData(employee); // Prefill form with existing data
    setEditModalVisible(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  // Update employee details
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/${selectedEmployee._id}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Employee details updated successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
      setEditModalVisible(false);
      // Update state with updated data
      setAllUser((prev) =>
        prev.map((emp) =>
          emp._id === selectedEmployee._id ? response.data.data : emp
        )
      );
    } catch (error) {
      toast.error("Error updating employee details.");
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUserRegisterDetails();
  }, []);

  return (
    <>
      <div className="relative min-h-screen  overflow-x-auto pt-6 lg:ml-[15rem] xs:ml-[4rem] p-2 max-w-7xl bg-gray-100">
      <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Employee Details</h2>
        </div>
        <div className=" bg-white shadow-md rounded-lg">
          <table className="w-full overflow-x-auto  text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Emp-code</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {getallUser.length > 0 ? (
                getallUser.map((user, index) => (
                  <tr
                    key={index}
                    className={`border-b transition-all ${
                      user.Empstatus === "terminated"
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.location}</td>
                    <td className="px-6 py-4">{user.department}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.employeeCode}</td>
                    <td className="px-6 py-4 flex justify-center gap-3 items-center">
                      <button
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleEditClick(user)}
                      >
                        {user.Empstatus == "terminated" ? "" : <FaRegEdit />}
                      </button>
                      <RiDeleteBin6Line
                        className="text-red-500 cursor-pointer"
                        onClick={() => deleteEmployee(user._id)}
                      />
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

      {/* Edit Modal */}
      {editModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Employee
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={updatedData.firstName || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={updatedData.email || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={updatedData.location || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={updatedData.department || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter department"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={updatedData.role || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter role"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditModalVisible(false)}
                  className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeTable;
