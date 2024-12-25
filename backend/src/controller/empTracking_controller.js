import { Employee } from "../modules/employee_modules.js"; // Adjust path as needed

// Controller to get active time
const getActiveTime = async (req, res) => {
  try {
    const employeeId = req.params.empId; // Correct way to access employeeId from params
    console.log(`Fetching active time for employee ID: ${employeeId}`);

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Send the total active time as a response
    res.status(200).json({ activeTime: employee.totalActiveTime || 0 }); // Ensure activeTime is a number
  } catch (error) {
    console.error("Error fetching active time:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to update active time
const updateActiveTime = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const { activeTime } = req.body;

    if (typeof activeTime !== "number" || activeTime < 0) {
      return res.status(400).json({ message: "Invalid active time provided" });
    }

    console.log(
      `Received active time: ${activeTime} minutes for employee ID: ${employeeId}`
    );

    // Find the employee by ID
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Update totalActiveTime by adding the new active time
    employee.totalActiveTime += activeTime;

    // Save the updated employee document
    await employee.save();

    console.log(`Updated totalActiveTime: ${employee.totalActiveTime} minutes`);

    res.status(200).json({
      message: "Activity data updated successfully",
      totalActiveTime: employee.totalActiveTime, // Return the updated total time
    });
  } catch (error) {
    console.error("Error updating activity time:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getActiveTime, updateActiveTime };
