import { Router } from "express";
import {
  userRegister,
  userLogin,
  userLogout,
} from "../controller/user_controller.js";

import {
  employeeLogin,
  employeeLogout,
  employeeRegister,
} from "../controller/employee_controller.js";
import { getAllUser } from "../controller/employee_controller.js";
import {
  projectDetails,
  getAllProject,
} from "../controller/projectController.js";
import { addBackgroundVerification } from "../controller/bgVerificationController.js";
import { addBankVerification } from "../controller/bankVerification_controller.js";
import {
  addRequestLeave,
  getLeaveLimits,
  updateLeaveRequest,
} from "../controller/empLeave_controller.js";
import markAttendance from "../controller/empAttendence_Controller.js";
import { getLeaveStatus } from "../controller/leave_controller.js";
import updateEmployeeLeaveBalance from "../controller/adminLeaves_Increase.js";

const userRouter = Router();

userRouter.route("/Register").post(userRegister);
// admin user login
userRouter.route("/Login").post(userLogin);
userRouter.route("/logout").post(userLogout);
userRouter.route("/:employeeId/logout").post(employeeLogout);
userRouter.route("/employee/requestLeave/update").patch(updateLeaveRequest);
userRouter.route("/update-employee-leave").post(updateEmployeeLeaveBalance);
userRouter.route("/:employeeId/leave/limits").get(getLeaveLimits);
userRouter.route("/:employeeId/request/leave").post(addRequestLeave);
// employee login
userRouter.route("/:employeeId/leaveStatus").get(getLeaveStatus);
userRouter.route("/employee/login").post(employeeLogin);
userRouter.route("/employee/register").post(employeeRegister);
userRouter.route("/employee/all/registerDetails").post(getAllUser);
userRouter.route("/projectDetails").post(projectDetails);
userRouter.route("/all/projectDetails").post(getAllProject);
userRouter.route("/:employeeId/verify").post(addBackgroundVerification);
userRouter.route("/:employeeId/bankDetails/verify").post(addBankVerification);
userRouter.route("/:employeeId/request/leave").post(addRequestLeave);
userRouter.route("/:employeeId/attendence/details").post(markAttendance);

export default userRouter;
