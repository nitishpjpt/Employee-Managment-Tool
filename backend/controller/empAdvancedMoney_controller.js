import { Employee } from "../modules/employee_modules.js";

const requestAdvance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { amount, reason } = req.body;

    if (!amount || !reason) {
      return res
        .status(400)
        .json({ message: "Amount and reason are required." });
    }

    // Fetch the employee data
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    // Check if the employee has completed at least 2 years with the company
    const currentDate = new Date();
    const joiningDate = new Date(employee.date); // Assuming `employee.date` stores the joining date
    const twoYearsAgo = new Date(
      currentDate.setFullYear(currentDate.getFullYear() - 2)
    );

    if (joiningDate > twoYearsAgo) {
      return res.status(403).json({
        message:
          "You are not eligible to request an advance until you have completed 2 years with the company.",
      });
    }

    // Proceed with submitting the advance request
    employee.advanceRequests.push({ amount, reason });
    await employee.save();

    res.status(201).json({
      message: "Advance request submitted successfully.",
      advanceRequests: employee.advanceRequests,
    });
  } catch (error) {
    console.error("Error in requestAdvance:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAdvanceRequests = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    res.status(200).json({ advanceRequests: employee.advanceRequests });
  } catch (error) {
    console.error("Error in getAdvanceRequests:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// approve advanced request by admin
const approveAdvanceRequest = async (req, res) => {
  try {
    const { employeeId, requestId } = req.params;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    const request = employee.advanceRequests.id(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    request.status = "approved";
    request.responseDate = Date.now();
    await employee.save();

    res.status(200).json({ message: "Advance request approved." });
  } catch (error) {
    console.error("Error approving advance request:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export { requestAdvance, getAdvanceRequests, approveAdvanceRequest };
