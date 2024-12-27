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
    console.log("update active time")
    // Validate the activeTime input (in minutes)
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

    // Update totalActiveTime by adding the new active time (in minutes)
    employee.totalActiveTime += activeTime; // Store the time in minutes, for calculations

    // Convert the total active time (in minutes) to hours, minutes, seconds format
    const totalMinutes = employee.totalActiveTime;
    const hr = Math.floor(totalMinutes / 60); // Get the hours
    const min = totalMinutes % 60; // Get the remaining minutes
    // Assume seconds are not required, set to 0 (you can modify this if you need more precision)

    // Convert to a human-readable format (string)
    const formattedActiveTime = `${hr}hr ${min} min`;

    // Store the formatted time as a string in the database
    employee.formattedActiveTime = formattedActiveTime;

    // Save the updated employee document with formatted time
    await employee.save();

    // Log the formatted active time in the backend console
    console.log(`Updated totalActiveTime: ${formattedActiveTime}`);

    // Return the updated total active time in both minutes (for calculations) and formatted string (for display)
    res.status(200).json({
      message: "Activity data updated successfully",
      totalActiveTime: employee.totalActiveTime, // Return the time in minutes (stored in DB)
      formattedActiveTime, // Optionally return the formatted time for frontend display
    });
  } catch (error) {
    console.error("Error updating activity time:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getActiveTime, updateActiveTime };
