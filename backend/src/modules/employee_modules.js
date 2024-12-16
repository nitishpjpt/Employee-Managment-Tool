import mongoose from "mongoose";
import bcrypt from "bcrypt";
import moment from "moment";

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
});

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  status: { type: String, enum: ["Present", "Absent"], default: "Absent" }, // Status: Present or Absent
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
    timezone: {
      type: String,
    },
    avtar: {
      type: String,
    },
    shift: {
      type: String,
    },
    loginDate: { type: String }, // Store the last login date
    loginTime: { type: String },
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

export const Employee = mongoose.model("Employee", employeeSchema);
