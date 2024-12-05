import { Employee } from "../modules/employee_modules";
import ApiError from "../utlis/ApiError";

const employeeRegister = async (req, res) => {
  console.log("Request Body:", req.body);

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phnNumber,
    employeeCode,
    location,
    role,
    department,
    date,
    timezone,
    avtar,
    shift,
  } = req.body;

  // check if user already register in database
  const existingUser = await Employee.findOne({
    $or: [{ email, password, phnNumber }],
  });

  if (!existingUser) {
    throw new ApiError(409, "employee with these details are already register");
  }

  // create a new user in the database
  const employee = await Employee.create({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phnNumber,
    employeeCode,
    location,
    role,
    department,
    date,
    timezone,
    avtar,
    shift,
  });

  // if employee does not register then throw a error
  if (!employee) {
    throw new ApiError(400, "Employee does not register");
  }

  // remove some sensitive information like password and confirmPassword

  const createdUser = await Employee.findById(employee._id).select(
    "-password",
    "confirmPassword"
  );

  if (!createdUser) {
    throw new ApiError(409, "Employee does not created");
  }

  // then send the successfull repsponse employee register

  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Registered Successfully"));
};

export default employeeRegister;
