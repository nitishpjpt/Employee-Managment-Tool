import mongoose from "mongoose";
import bcrypt from "bcrypt";

// background verification Schema
const backgroundVerificationSchema = new mongoose.Schema({
  addhar: { type: String, required: true },
  pan: { type: String, required: true },
  driving: { type: String, required: true },
  voterCard: { type: String, required: true },
  uan: { type: String, required: true },
});

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
      requied: true,
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
    requestLeave: requestLeaveSchema,
    location: { type: String },
  },
  { timestamps: true }
);

// bcrypt the employee password and confirm password
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

// function to compare the password
employeeSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const Employee = mongoose.model("Employee", employeeSchema);
