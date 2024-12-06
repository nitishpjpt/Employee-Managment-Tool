import { Employee } from "../modules/employee_modules.js";
import ApiError from "../utlis/ApiError.js";
import uploadOnCloudinary from "../utlis/Cloudinay.js";
import ApiResponse from "../utlis/ApiResponse.js";


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
    shift,
  } = req.body;

  // check if user already register in database
  const existingUser = await Employee.findOne({
    $or: [{ email, password, phnNumber }],
  });

  if (existingUser) {
    throw new ApiError(409, "employee with these details are already register");
  }

  // const avatarLocalPath = req.files;
  // console.log(avatarLocalPath);

  // const avtarImg = await uploadOnCloudinary(avatarLocalPath);
  // // if you can does not register user without the avtar
  // if (!avtarImg) {
  //   throw new ApiError(400, "Avatar is required on Cloudinary");
  // }

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
    shift,
  });

  // if employee does not register then throw a error
  if (!employee) {
    throw new ApiError(400, "Employee does not register");
  }

  // remove some sensitive information like password and confirmPassword

  const createdUser = await Employee.findById(employee._id).select(
    "-password -refreshToken -confirmPassword "
  );

  if (!createdUser) {
    throw new ApiError(409, "Employee does not created");
  }

  // then send the successfull repsponse employee register

  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Registered Successfully"));
};


const getAllUser = async (req, res) => {
  const user = await Employee.find().lean();

  if (!user) {
    throw new ApiError(401, "User data does not get");
  }

  res.status(200).json(
    new ApiResponse(
      201,
      {
        user,
      },
      "all registered user"
    )
  );
};



export  {employeeRegister,getAllUser};
