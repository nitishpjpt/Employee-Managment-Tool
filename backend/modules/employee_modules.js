import mongoose from "mongoose";
import bcrypt from "bcrypt";
import moment from "moment";
import jwt from "jsonwebtoken";

// Background Verification Schema
const backgroundVerificationSchema = new mongoose.Schema({
  addhar: { type: String, required: true },
  pan: { type: String, required: true },
  driving: { type: String, required: true },
  voterCard: { type: String, required: true },
  uan: { type: String, required: true },
});

// Bank Verification Schema
const bankVerificationSchema = new mongoose.Schema({
  accountName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  ifscCode: {
    type: String,
  },
  holderName: {
    type: String,
  },
});

// Request Leave Schema
const requestLeaveSchema = new mongoose.Schema({
  fromDate: {
    type: String,
  },
  toDate: {
    type: String,
  },
  halfLeave: {
    type: String,
  },
  fullLeave: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending", // Default status when leave is requested
  },
});

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Format: YYYY-MM-DD, // Date of the attendance, // Format: YYYY-MM-DD
  status: { type: String, enum: ["Present", "Absent"], default: "Absent" }, // Status: Present or Absent
  loginTime: { type: String }, // Store login time
  logoutTime: { type: String }, // Store logout time
});

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    confirmPassword: {
      type: Number,
      required: [true, "Password is required"],
    },
    phnNumber: {
      type: String,
    },
    employeeCode: {
      type: String,
    },
    location: {
      type: String,
    },
    role: {
      type: String,
    },
    department: {
      type: String,
    },
    date: {
      type: String,
    },

    avtar: {
      type: String,
    },

    lastLoginTime: {
      type: String, // Stores the most recent login time (HH:mm:ss format)
      default: null,
    },
    loginDate: { type: String }, // Store the last login date
    loginTime: { type: String },
    logoutTime: { type: String },
    totalActiveTime: { type: Number, default: 0 }, // Total active time in minutes
    totalInactiveTime: { type: Number, default: 0 },
    formattedInactiveTime: { type: String }, // Store formatted inactive time
    formattedActiveTime: { type: String }, // Store formatted time as a string
    dailyActivity: [
      {
        date: { type: Date, default: Date.now },
        activeTime: { type: Number, default: 0 },
        inactiveTime: { type: Number, default: 0 },
        formattedInactiveTime: { type: String }, // Store formatted inactive time
        formattedActiveTime: { type: String }, // Store formatted time as a string
      },
    ],
    backgroundVerification: backgroundVerificationSchema,
    bankVerification: bankVerificationSchema,
    requestLeave: [requestLeaveSchema],
    location: { type: String },
    fullDayLeavesThisMonth: { type: Number, default: 0 }, // Track full-day leaves for the current month
    halfDayLeavesThisMonth: { type: Number, default: 0 }, // Track half-day leaves for the current month
    attendance: [attendanceSchema], // Add the attendance array to track the attendance history
  },
  { timestamps: true }
);

// bcrypt the employee password and confirm password
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

// Function to compare the password
employeeSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Function to mark attendance as 'Present' for the current day
employeeSchema.methods.markAttendance = async function () {
  const today = moment().format("YYYY-MM-DD");

  // Check if attendance is already marked for today
  const existingAttendance = this.attendance.find((att) => att.date === today);

  if (!existingAttendance) {
    // Mark attendance as 'Present' if not already done
    this.attendance.push({ date: today, status: "Present" });
    await this.save();
  }
};

// function for ading leave manually by admin
// Inside employeeSchema
// Method to update leave balance
// Method to update leave balance (increase or decrease)
employeeSchema.methods.updateLeaveBalance = async function (
  leaveType,
  amount,
  action
) {
  if (action === "increase") {
    // Increase leave balance
    if (leaveType === "fullDay") {
      this.fullDayLeavesThisMonth += amount;
    } else if (leaveType === "halfDay") {
      this.halfDayLeavesThisMonth += amount;
    } else {
      throw new Error("Invalid leave type");
    }
  } else if (action === "decrease") {
    // Decrease leave balance
    if (leaveType === "fullDay") {
      this.fullDayLeavesThisMonth -= amount;
      if (this.fullDayLeavesThisMonth < 0) this.fullDayLeavesThisMonth = 0;
    } else if (leaveType === "halfDay") {
      this.halfDayLeavesThisMonth -= amount;
      if (this.halfDayLeavesThisMonth < 0) this.halfDayLeavesThisMonth = 0;
    } else {
      throw new Error("Invalid leave type");
    }
  } else {
    throw new Error("Invalid action. Use 'increase' or 'decrease'.");
  }

  await this.save();
};

// function to generate the access token for login employee
employeeSchema.methods.generateAccessToken = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: process.env.EXPIRE_ACCESS_TOKEN,
      }
    );
  } catch (error) {
    console.error("Error generating access token:", error);
    throw new Error("Failed to generate access token.");
  }
};

export const Employee = mongoose.model("Employee", employeeSchema);
