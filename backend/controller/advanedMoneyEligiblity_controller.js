import { Employee } from "../modules/employee_modules.js";

// Update eligibility policy
const advancedEligibility = async (req, res) => {
  try {
    const { advanceEligibilityYears } = req.body;

    if (advanceEligibilityYears < 1) {
      return res
        .status(400)
        .json({ message: "Eligibility years must be at least 1 year." });
    }

    const settings = await Employee.findOneAndUpdate(
      {}, // Assuming a single settings document
      { advanceEligibilityYears },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Advance eligibility policy updated successfully.",
      settings,
    });
  } catch (error) {
    console.error("Error updating eligibility policy:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


const getEligiblityPolicy = async (req, res) => {
  try {
    const settings = await Employee.findOne();
    if (!settings) {
      return res.status(404).json({ message: "Settings not found." });
    }

    res.status(200).json(settings);
  } catch (error) {
    console.error("Error fetching eligibility policy:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};



export { advancedEligibility, getEligiblityPolicy };
