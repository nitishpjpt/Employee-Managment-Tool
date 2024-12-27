import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      unique: true,
    },
    // no_of_user: {
    //   type: Number,
    // },
    // organization_name: {
    //   type: String,
    //   unique: true,
    //   sparse: true
    // },
    // organization_teamSize: {
    //   type: Number,
    // },
    contactId: {
      type: String,
      unique: true,
    },
  
  },
  { timestamps: true }
);

// bcrypt the user password beforestore in the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

// function to compare the password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};


// funtion to generate the access token
// Function to generate the access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email, // Don't store password in the token
    },
    process.env.ACCESS_TOKEN, // Make sure to use a proper secret key
    {
      expiresIn: process.env.EXPIRE_ACCESS_TOKEN, // Set the expiry time
    }
  );
};


// schema for adding the employee leave by admin




export const User = mongoose.model("User", userSchema);
