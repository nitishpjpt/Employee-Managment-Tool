import { Employee } from "../modules/employee_modules.js";


const deleteEmployee = async (req, res) => {
    try {
      const { employeeId } = req.params; // Get employeeId from request params
  
    //   // Check if the user is an admin (you should implement admin authorization logic)
    // //   const isAdmin = req.user?.role === "admin"; // Assuming req.user contains authenticated user details
    // //   if (!isAdmin) {
    // //     return res.status(403).json({ message: "You are not authorized to delete employees" });
    //   }
  
      // Find and delete the employee by their ID
      const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
      if (!deletedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      res.status(200).json({
        message: "Employee deleted successfully",
        deletedEmployee,
      });
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

  export default deleteEmployee;