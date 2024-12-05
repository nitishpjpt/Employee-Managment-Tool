import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: Number,
    required: true,
  },
  confirmPassword: {
    type: Number,
    required: true,
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
    type: Number,
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
});

export const Employee = mongoose.model("Employee", employeeSchema);
