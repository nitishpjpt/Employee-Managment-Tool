import { Employee } from "../modules/employee_modules.js";

const gatePassRequest = async (req, res) => {
  console.log("Gate pass request received"); // <-- Add this line
  try {
    const { reason, logoutTime, employeeId } = req.body;
    console.log("Request body:", req.body);

    console.log(reason, logoutTime, employeeId);

    const employee = await Employee.findById(employeeId);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    // Create a new gate pass request inside Employee collection
    const newRequest = {
      reason,
      status: "Pending",
      requestedAt: new Date(),
      logoutTime,
    };

    employee.gatePassRequests.push(newRequest);
    await employee.save();

    res
      .status(201)
      .json({ message: "Gate pass requested successfully", newRequest });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const gatePassApproval = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { gatePassId, status } = req.body;

    // Ensure the status is either 'Approved' or 'Rejected'
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    // Find the gate pass request inside Employee document
    const gatePass = employee.gatePassRequests.id(gatePassId);
    if (!gatePass)
      return res.status(404).json({ message: "Gate pass request not found" });

    // Update the gate pass status
    gatePass.status = status;
    gatePass.approvedAt = new Date();

    // Save the updated employee document
    await employee.save();

    res.json({
      message: `Gate pass ${status.toLowerCase()} successfully`,
      gatePass,
    });
  } catch (error) {
    console.error("Error in gate pass approval:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllPassRequest = async (req, res) => {
  try {
    const { employeeId } = req.params; // Get employeeId from the URL
    console.log(employeeId);
    const employee = await Employee.findById(employeeId);

    console.log(employee);

    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    res.json({ gatePassRequests: employee.gatePassRequests });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export { gatePassRequest, gatePassApproval, getAllPassRequest };
