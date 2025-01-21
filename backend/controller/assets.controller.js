import { Employee } from "../modules/employee_modules.js";
import { Assets } from "../modules/assets.js"; // Import the Assets model if needed for asset validation

// Assign assets to an employee
const assets = async (req, res) => {
  const { employeeId, assetIds } = req.body;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    for (const assetName of assetIds) {
      let asset = await Assets.findOne({ name: assetName });

      if (!asset) {
        // Assign a valid `type` when adding a new asset
        asset = new Assets({
          name: assetName,
          type: "Other", // Ensure "Other" is a valid enum value
        });
        await asset.save();
      }
    }

    employee.assets.push(...assetIds);
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
