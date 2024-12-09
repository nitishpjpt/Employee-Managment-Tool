import { Router } from "express";
import { userRegister, userLogin } from "../controller/user_controller.js";
import { upload } from "../middleware/multer.js";
import {employeeRegister} from "../controller/employee_controller.js";
import { getAllUser } from "../controller/employee_controller.js";
import {projectDetails,getAllProject} from "../controller/projectController.js";


const userRouter = Router();

userRouter.route("/Register").post(userRegister);
userRouter.route("/Login").post(userLogin);
userRouter.route("/employee/register").post(employeeRegister);
userRouter.route("/employee/all/registerDetails").post(getAllUser);
userRouter.route("/projectDetails").post(projectDetails);
userRouter.route("/all/projectDetails").post(getAllProject)

export default userRouter;
