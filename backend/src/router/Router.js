import { Router } from "express";
import {userRegister,userLogin} from "../controller/user_controller.js";


const userRouter = Router();

userRouter.route("/Register").post(userRegister);

userRouter.route("/Login").post(userLogin);


export default userRouter;