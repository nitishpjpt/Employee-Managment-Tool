import { Router } from "express";
import { userRegister, userLogin } from "../controller/user_controller.js";
import { upload } from "../middleware/multer.js";
import {employeeRegister} from "../controller/employee_controller.js";
import { getAllUser } from "../controller/employee_controller.js";

const userRouter = Router();

userRouter.route("/Register").post(userRegister);
userRouter.route("/Login").post(userLogin);
userRouter.route("/employee/register").post(employeeRegister);
userRouter.route("/employee/all/registerDetails").post(getAllUser);

export default userRouter;
