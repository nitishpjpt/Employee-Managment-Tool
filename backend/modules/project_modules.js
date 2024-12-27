import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
    },
    managerName: {
      type: String,
    },
    selectMember: {
      type: Number,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    description:{
      type:String
    }
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
