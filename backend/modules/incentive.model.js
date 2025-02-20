import mongoose from "mongoose";

// Define the schema for the Asset
const incentiveSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Assets model based on the schema
export const Incentive = mongoose.model("Incentive", incentiveSchema);
