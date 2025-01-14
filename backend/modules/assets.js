import mongoose from "mongoose";

// Define the schema for the Asset
const assetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  // Make sure the asset name is required
    },
    type: {
      type: String,
      required: true,  // Make sure the asset type is required
    },
    availability: {
      type: Boolean,
      default: true,  // Set availability to true by default
    },
  },
  {
    timestamps: true,  // Automatically add createdAt and updatedAt fields
  }
);

// Create the Assets model based on the schema
export const Assets = mongoose.model("Assets", assetSchema);


