import { Employee } from "../modules/employee_modules.js";
import { Assets } from "../modules/assets.js";

// Assign assets to an employee
const assets = async (req, res) => {
    const { employeeId, assetIds } = req.body;
  
    try {
      // Validate the employee
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      // Validate the assets (strings in this case)
      const validAssets = ["Laptop", "Bike", "Mobile", "Headset"];
      const invalidAssets = assetIds.filter(asset => !validAssets.includes(asset));
  
      if (invalidAssets.length > 0) {
        return res.status(400).json({ message: `Invalid asset(s): ${invalidAssets.join(', ')}` });
      }
  
      // Assign assets to the employee
      employee.assets.push(...assetIds); // Store asset names as strings
      await employee.save();
  
      res.json({ message: "Assets assigned successfully", employee });
    } catch (error) {
      console.error("Error assigning assets:", error);
      res.status(500).json({ message: error.message || "Internal Server Error" });
    }
  };
  

// Fetch all employees with their assets
const fetchAllAssets = async (req, res) => {
  try {
    const employees = await Employee.find().populate("assets");
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: error.message });
  }
};

export { fetchAllAssets, assets };
