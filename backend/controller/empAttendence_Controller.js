import moment from "moment";
import { Employee } from "../modules/employee_modules.js";

const markAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Fetch the employee
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Get today's date and current time
    const todayDate = moment().format("YYYY-MM-DD");
    const currentTime = moment().format("HH:mm:ss");

    // Check if attendance for today is already marked
    const existingAttendance = employee.attendance.find(
      (att) => att.date === todayDate
    );

    if (!existingAttendance) {
      // Mark attendance as 'Present' for today with login time
      employee.attendance.push({
        date: todayDate,
        status: "Present",
        loginTime: currentTime, // Save login time only once
      });

      // Only update loginDate and loginTime fields if it's the first login today
      if (!employee.loginDate || employee.loginDate !== todayDate) {
        employee.loginDate = todayDate;
        employee.loginTime = currentTime;
      }

      await employee.save();
    }

    // Fetch the employee's attendance history with login times for each date
    const attendanceHistory = employee.attendance.map((record) => ({
      date: record.date,
      status: record.status,
      loginTime: record.date === todayDate ? employee.loginTime : record.loginTime || "N/A", // Use saved loginTime for today or previously recorded
    }));

    // Response with today's attendance and the complete attendance history
    res.status(200).json({
      today: {
        date: todayDate,
        loginTime: employee.loginTime, // Use saved login time, not the current time
        status: existingAttendance ? existingAttendance.status : "Present", // Status remains as "Present" if not marked already
      },
      attendanceHistory,
      message: "Attendance marked and fetched successfully",
    });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default markAttendance;
