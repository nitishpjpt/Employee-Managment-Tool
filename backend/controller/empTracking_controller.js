import { Employee } from "../modules/employee_modules.js"; // Adjust path as needed

// Controller to get active and inactive time
const getActiveTime = async (req, res) => {
  try {
    const employeeId = req.params.empId; // Correct way to access employeeId from params
    console.log(`Fetching activity time for employee ID: ${employeeId}`);

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Send the total active time and inactive time as a response
    res.status(200).json({
      activeTime: employee.totalActiveTime || 0,
      inactiveTime: employee.totalInactiveTime || 0, // Ensure inactiveTime is included
    });
  } catch (error) {
    console.error("Error fetching activity time:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to update active time and inactive time
const updateActiveTime = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const { activeTime, inactiveTime } = req.body; // Expecting both activeTime and inactiveTime
    console.log("Updating active and inactive time");

    // Validate the activeTime and inactiveTime input (in minutes)
    if (typeof activeTime !== "number" || activeTime < 0) {
      return res.status(400).json({ message: "Invalid active time provided" });
    }
    if (typeof inactiveTime !== "number" || inactiveTime < 0) {
      return res.status(400).json({ message: "Invalid inactive time provided" });
    }

    console.log(
      `Received active time: ${activeTime} minutes and inactive time: ${inactiveTime} minutes for employee ID: ${employeeId}`
    );

    // Find the employee by ID
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Update totalActiveTime by adding the new active time (in minutes)
    employee.totalActiveTime += activeTime; // Store the time in minutes, for calculations
    employee.totalInactiveTime += inactiveTime; // Accumulate inactive time in minutes

    // Convert the total active time (in minutes) to hours, minutes format
    const totalMinutes = employee.totalActiveTime;
    const hr = Math.floor(totalMinutes / 60); // Get the hours
    const min = totalMinutes % 60; // Get the remaining minutes

    // Convert to a human-readable format (string)
    const formattedActiveTime = `${hr}hr ${min} min`;

    // Convert the total inactive time (in minutes) to hours, minutes format
    const totalInactiveMinutes = employee.totalInactiveTime;
    const inactiveHr = Math.floor(totalInactiveMinutes / 60); // Get the hours
    const inactiveMin = totalInactiveMinutes % 60; // Get the remaining minutes

    // Convert to a human-readable format (string) for inactive time
    const formattedInactiveTime = `${inactiveHr}hr ${inactiveMin} min`;

    // Store the formatted time as a string in the database
    employee.formattedActiveTime = formattedActiveTime;
    employee.formattedInactiveTime = formattedInactiveTime;

    // Save the updated employee document with formatted times
    await employee.save();

    // Log the updated times in the backend console
    console.log(`Updated totalActiveTime: ${formattedActiveTime}`);
    console.log(`Updated totalInactiveTime: ${formattedInactiveTime}`);

    // Return the updated total active and inactive time in both minutes (for calculations) and formatted strings (for display)
    res.status(200).json({
      message: "Activity data updated successfully",
      totalActiveTime: employee.totalActiveTime, // Return the time in minutes (stored in DB)
      formattedActiveTime, // Optionally return the formatted active time for frontend display
      totalInactiveTime: employee.totalInactiveTime, // Return the inactive time in minutes
      formattedInactiveTime, // Optionally return the formatted inactive time for frontend display
    });
  } catch (error) {
    console.error("Error updating activity time:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getActiveTime, updateActiveTime };
