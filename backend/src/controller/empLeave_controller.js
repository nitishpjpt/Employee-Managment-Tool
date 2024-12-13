import { Employee } from "../modules/employee_modules.js";
import ApiError from "../utlis/ApiError.js";
import ApiResponse from "../utlis/ApiResponse.js";

const addRequestLeave = async (req, res) => {
  const { fromDate, toDate, halfLeave, fullLeave } = req.body; // Request leave data
  const { employeeId } = req.params; // Employee ID from URL

  console.log(`Employee ID: ${employeeId}`);
  console.log("Request Leave Details:", req.body);

  try {
    // Check if the employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new ApiError(404, "Employee not found");
    }

    // Push the request leave data to the employee's requestLeave array
    employee.requestLeave = {
      fromDate,
      toDate,
      halfLeave,
      fullLeave,
    };

    // Save updated employee data
    const updatedEmployee = await employee.save();

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedEmployee,
          "Request leave details added successfully"
        )
      );
  } catch (error) {
    console.error("Error adding request leave ", error);
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export { addRequestLeave };
