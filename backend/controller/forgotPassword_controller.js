import { Employee } from "../modules/employee_modules.js";
import bcrypt from "bcrypt";
import ApiError from "../utlis/ApiError.js";
import ApiResponse from "../utlis/ApiResponse.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("Email: ", email);
    // Check if employee exists with the provided email
    const employee = await Employee.findOne({ email });
    if (!employee) {
      throw new ApiError(404, "Employee not found with this email.");
    }

    // Create a password reset token (using crypto for security)
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash the reset token and save it to the employee's record
    employee.passwordResetToken = bcrypt.hashSync(resetToken, 10);
    employee.passwordResetExpires = Date.now() + 3600000; // Token expires in 1 hour
    await employee.save();

    // Create a reset password link
    const resetUrl = `reset-password?token=${resetToken}&email=${email}`;

    // Send the reset password link via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click the link below to reset your password:</p><a href="${resetUrl}">Reset Password</a>`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json(
        new ApiResponse(200, null, "Password reset link sent to your email.")
      );
  } catch (error) {
    console.error("Error during forgot password:", error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, email, newPassword } = req.body;
    console.log("Token: ", token, "Email: ", email, "New Password: ");
    // Find the employee by email
    const employee = await Employee.findOne({ email });
    if (!employee) {
      throw new ApiError(404, "Employee not found with this email.");
    }

    // Check if the token matches and is not expired
    const isTokenValid = bcrypt.compareSync(token, employee.passwordResetToken);
    if (!isTokenValid || Date.now() > employee.passwordResetExpires) {
      throw new ApiError(400, "Invalid or expired reset token.");
    }

    // Update the employee's password
    employee.password = await bcrypt.hash(newPassword, 10);
    employee.passwordResetToken = undefined; // Clear the reset token
    employee.passwordResetExpires = undefined; // Clear the expiration time
    await employee.save();

    res
      .status(200)
      .json(new ApiResponse(200, null, "Password successfully reset."));
  } catch (error) {
    console.error("Error during reset password:", error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

export { forgotPassword, resetPassword };
