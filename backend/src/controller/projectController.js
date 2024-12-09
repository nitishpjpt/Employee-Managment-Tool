import mongoose from "mongoose";
import { Project } from "../modules/project_modules.js";
import ApiError from "../utlis/ApiError.js";
import ApiResponse from "../utlis/ApiResponse.js";
import { getAllUser } from "./employee_controller.js";


// controller for assing the project
const projectDetails = async (req, res) => {
  //req the from field
  const {
    projectName,
    managerName,
    selectMember,
    startDate,
    endDate,
    description,
  } = req.body;

  const existingProject = await Project.findOne({ projectName });

  if (existingProject) {
    throw new ApiError(404, "Project with this name is already exist");
  }

  const project = await Project.create({
    projectName,
    managerName,
    selectMember,
    startDate,
    endDate,
    description,
  });

  if (!project) {
    throw new ApiError(404, "Project does not created");
  }

  res
    .status(202)
    .json(new ApiResponse(201, { project }, "Project Created Successfully"));
};

// count total  project
const getAllProject = async (req, res) => {
  const projectDetails = await Project.find();

  if (!projectDetails) {
    throw new ApiError(401, "Projects does not get");
  }

  // count the total number of registration
  const totalProjects = await projectDetails.length;
  // console.log(totalProjects);

  res.status(200).json(
    new ApiResponse(
      201,
      {
        projectDetails,
        totalProjects,
      },
      "All project details"
    )
  );
};

export { projectDetails, getAllProject };
