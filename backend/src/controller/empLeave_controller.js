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

    // Get the current date and month for tracking monthly leaves
    const currentMonth = new Date().getMonth();

    // Check if this is a new month to reset the leave counts
    const lastUpdatedMonth = employee.updatedAt.getMonth();
    if (lastUpdatedMonth !== currentMonth) {
      employee.fullDayLeavesThisMonth = 0;
      employee.halfDayLeavesThisMonth = 0;
    }

    // Validate the leave request
    if (halfLeave) {
      // Half-day leave logic: Limit to 5 per month
      if (employee.halfDayLeavesThisMonth >= 5) {
        return res.status(400).json({
          message: "You have exhausted your 5 half-day leaves for this month.",
        });
      }
      employee.halfDayLeavesThisMonth += 1;
    } else if (fullLeave) {
      // Full-day leave logic: Limit to 3 per month
      if (employee.fullDayLeavesThisMonth >= 3) {
        return res.status(400).json({
          message: "You have exhausted your 3 full-day leaves for this month.",
        });
      }
      employee.fullDayLeavesThisMonth += 1;
    } else {
      return res.status(400).json({ message: "Invalid leave type." });
    }

    // Append the new leave request to the requestLeave array
    employee.requestLeave.push({
      fromDate,
      toDate,
      halfLeave,
      fullLeave,
    });

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

// add an request leave controller
// Delete Request Leave Controller
const deleteRequestLeave = async (req, res) => {
  const { employeeId, leaveId } = req.params;

  console.log(employeeId, leaveId);

  try {
    // Fetch the employee by ID
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new ApiError(404, "Employee not found"); // Correctly set error message
    }

    // Find the leave request by ID
    const leaveIndex = employee.requestLeave.findIndex(
      (leave) => leave._id.toString() === leaveId
    );
    if (leaveIndex === -1) {
      throw new ApiError(404, "Leave request not found"); // Correctly set error message
    }

    // Remove the leave request
    employee.requestLeave.splice(leaveIndex, 1);

    // Save the updated employee data
    await employee.save();

    res.status(200).json({
      message: "Leave request deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting request leave", error);

    // Ensure proper status codes and response structure
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};

export { addRequestLeave, deleteRequestLeave };
