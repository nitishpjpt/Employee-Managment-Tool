import { Router } from "express";
import { userRegister, userLogin } from "../controller/user_controller.js";

import { employeeRegister } from "../controller/employee_controller.js";
import { getAllUser } from "../controller/employee_controller.js";
import {
  projectDetails,
  getAllProject,
} from "../controller/projectController.js";
import { addBackgroundVerification } from "../controller/bgVerificationController.js";
import { addBankVerification } from "../controller/bankVerification_controller.js";

const userRouter = Router();

userRouter.route("/Register").post(userRegister);
userRouter.route("/Login").post(userLogin);
userRouter.route("/employee/register").post(employeeRegister);
userRouter.route("/employee/all/registerDetails").post(getAllUser);
userRouter.route("/projectDetails").post(projectDetails);
userRouter.route("/all/projectDetails").post(getAllProject);
userRouter.route("/:employeeId/verify").post(addBackgroundVerification);
userRouter.route("/:employeeId/bankDetails/verify").post(addBankVerification);

export default userRouter;
