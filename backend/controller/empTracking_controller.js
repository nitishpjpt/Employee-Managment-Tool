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
    const { activeTime, inactiveTime } = req.body; // Time in minutes

    if (typeof activeTime !== "number" || activeTime < 0) {
      return res.status(400).json({ message: "Invalid active time" });
    }
    if (typeof inactiveTime !== "number" || inactiveTime < 0) {
      return res.status(400).json({ message: "Invalid inactive time" });
    }

    // Find the employee by ID
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Get the current date and the last activity date from the employee data
    const currentDate = new Date();
    const lastActivityDate =
      employee.dailyActivity[employee.dailyActivity.length - 1]?.date;

    // If it's a new day, reset the active and inactive times
    if (
      !lastActivityDate ||
      lastActivityDate.toDateString() !== currentDate.toDateString()
    ) {
      // New day, add the current day's data and reset the time counters
      employee.dailyActivity.push({
        date: currentDate,
        activeTime: employee.totalActiveTime,
        inactiveTime: employee.totalInactiveTime,
        formattedActiveTime: formatTime(employee.totalActiveTime), // Add formatted active time
        formattedInactiveTime: formatTime(employee.totalInactiveTime), // Add formatted inactive time
      });

      // Reset active and inactive times for the new day
      employee.totalActiveTime = 0;
      employee.totalInactiveTime = 0;
    }

    // Update the total active and inactive times for the day
    employee.totalActiveTime += activeTime;
    employee.totalInactiveTime += inactiveTime;

    // Format active time and inactive time for the current day
    const formattedActiveTime = formatTime(employee.totalActiveTime);
    const formattedInactiveTime = formatTime(employee.totalInactiveTime);

    // Save the employee document
    await employee.save();

    res.status(200).json({
      message: "Activity data updated successfully",
      totalActiveTime: employee.totalActiveTime,
      totalInactiveTime: employee.totalInactiveTime,
      formattedActiveTime,        // Return formatted active time
      formattedInactiveTime,      // Return formatted inactive time
      dailyActivity: employee.dailyActivity,
    });
  } catch (error) {
    console.error("Error updating activity time:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Helper function to format time (in minutes) to hh:mm
const formatTime = (timeInMinutes) => {
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;
  return `${hours}hr ${minutes}min`;
};


export { getActiveTime, updateActiveTime };
