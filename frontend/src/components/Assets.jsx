import React, { useContext, useState } from "react";
import MainDashboard from "../pages/MainDashboard";
import { EmployeeContext } from "../context/EmployeeContext";
import { Button } from "@mui/material";
import Select from "react-select";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Assets = () => {
  const { employees, setRefresh } = useContext(EmployeeContext);
  const [selectedAssets, setSelectedAssets] = useState({}); // Track selected assets per employee
  const [assigning, setAssigning] = useState({}); // Track loading state for each employee

  // Example assets (You can fetch this data from the backend)
  const assetOptions = [
    { value: "Laptop", label: "Laptop" },
    { value: "Bike", label: "Bike" },
    { value: "Mobile", label: "Mobile" },
    { value: "Headset", label: "Headset" },
  ];

  // Handle asset selection
  const handleAssetChange = (selected, employeeId) => {
    console.log(selected, employeeId);
    setSelectedAssets((prev) => ({
      ...prev,
      [employeeId]: selected,
    }));
  };

  // Handle API call to assign assets
  const assignAssets = async (employeeId) => {
    console.log("Employee ID:", employeeId); // Check if employeeId is correct

    const assets =
      selectedAssets[employeeId]?.map((asset) => asset.value) || [];

    if (assets.length === 0) {
      alert("Please select at least one asset to assign.");
      return;
    }

    setAssigning((prev) => ({ ...prev, [employeeId]: true }));

    try {
      console.log("Sending API request:", { employeeId, assetIds: assets });

      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/assign/assets`,
        {
          employeeId, // Ensure employeeId is passed correctly here
          assetIds: assets,
        }
      );
      setRefresh();
      //handle the response
      toast.success("Assets added successfully!", {
        position: "top-right",
        autoClose: 1000,
      });

      setSelectedAssets((prev) => ({ ...prev, [employeeId]: [] }));
    } catch (error) {
      toast.error("Assets added successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
    } finally {
      setAssigning((prev) => ({ ...prev, [employeeId]: false }));
    }
  };

  return (
    <>
      <MainDashboard />
      <div>
        <div className="relative overflow-x-auto pt-6 lg:ml-[15rem] xs:ml-[4rem] p-2 max-w-7xl">
          <h1 className="text-center pb-4 font-semibold text-2xl text-gray-800">
            Assign assets to employee
          </h1>
          <div className="bg-white shadow-md rounded-lg">
            <table className="w-full overflow-x-auto text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Emp-code</th>
                  <th className="px-6 py-3">Added Assets</th>
                  <th className="px-6 py-3">Assets</th>
                  <th className="px-6 py-3">Add</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((user) => (
                    <tr
                      key={user._id}
                      className={`border-b transition-all ${
                        user.Empstatus === "terminated"
                          ? "bg-gray-100 text-gray-400"
                          : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {user.firstName} 
                      </td>
                      <td className="px-6 py-4">{user.department}</td>
                      <td className="px-6 py-4">{user.role}</td>
                      <td className="px-6 py-4">{user.employeeCode}</td>
                      <td className="px-6 py-4">{user.assets || []}</td>
                      <td className="px-2 py-4">
                        <Select
                          options={assetOptions}
                          isMulti
                          value={selectedAssets[user._id] || []}
                          onChange={(selected) =>
                            handleAssetChange(selected, user._id)
                          }
                          placeholder="Assign assets"
                          className="w-60"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => assignAssets(user._id)}
                          disabled={assigning[user._id]} // Disable button for the specific employee when assigning
                        >
                          {assigning[user._id] ? "Assigning..." : "Add"}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No employees found
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

export default Assets;
