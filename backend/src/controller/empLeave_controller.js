import { Employee } from "../modules/employee_modules.js";
import ApiError from "../utlis/ApiError.js";
import ApiResponse from "../utlis/ApiResponse.js";



// Get Leave Limits from Admin
const getLeaveLimits = async (req, res) => {
  try {
    const limits = {
      halfDayLeaves: 5, // Default value, this should be fetched dynamically if changed by the admin
      fullDayLeaves: 3, // Default value, this should be fetched dynamically if changed by the admin
    };
    
    // If you have a configuration model, fetch these values dynamically
    // Example: const limits = await Config.findOne({ type: 'leave_limits' });

    res.status(200).json(limits);
  } catch (error) {
    console.error("Error fetching leave limits:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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

    // Initialize leave counters if they don't exist
    if (employee.halfDayLeavesThisMonth === undefined) {
      employee.halfDayLeavesThisMonth = 0;
    }
    if (employee.fullDayLeavesThisMonth === undefined) {
      employee.fullDayLeavesThisMonth = 0;
    }

    // Get the current date and month for tracking monthly leaves
    const currentMonth = new Date().getMonth();

    // Check if this is a new month to reset the leave counts
    const lastUpdatedMonth = employee.updatedAt.getMonth();
    if (lastUpdatedMonth !== currentMonth) {
      employee.fullDayLeavesThisMonth = 0;
      employee.halfDayLeavesThisMonth = 0;
    }

    // Check for the dynamic leave limits from the Admin settings (if applicable)
    const maxHalfDayLeaves = 5;  // You can change this dynamically based on admin settings
    const maxFullDayLeaves = 3;  // Similarly, this can be fetched from admin settings

    // Validate the leave request
    if (halfLeave) {
      // Half-day leave logic: Limit to 5 per month
      if (employee.halfDayLeavesThisMonth >= maxHalfDayLeaves) {
        return res.status(400).json({
          message: `You have exhausted your ${maxHalfDayLeaves} half-day leaves for this month.`,
        });
      }
      employee.halfDayLeavesThisMonth += 1;
    } else if (fullLeave) {
      // Full-day leave logic: Limit to 3 per month
      if (employee.fullDayLeavesThisMonth >= maxFullDayLeaves) {
        return res.status(400).json({
          message: `You have exhausted your ${maxFullDayLeaves} full-day leaves for this month.`,
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
    console.error("Error adding request leave", error);
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};


// add an request leave controller
// Delete Request Leave Controller
const updateLeaveRequest = async (req, res) => {
  try {
    const { userId, leaveId, status } = req.body;

    // Find the employee by ID
    const employee = await Employee.findById(userId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    // Find the leave request by ID
    const leave = employee.requestLeave.find(
      (leave) => leave._id.toString() === leaveId
    );
    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found',
      });
    }

    // Update the leave status
    leave.status = status;

    // Save the updated employee document
    await employee.save();

    res.status(200).json({
      success: true,
      message: `Leave request ${status.toLowerCase()} successfully.`,
      updatedEmployee: employee, // Return updated employee data
    });
  } catch (error) {
    console.error('Error updating leave request status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }



};







export { addRequestLeave, updateLeaveRequest,getLeaveLimits };
