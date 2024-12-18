import { Employee } from "../modules/employee_modules.js";
import ApiError from "../utlis/ApiError.js";
import uploadOnCloudinary from "../utlis/Cloudinay.js";
import ApiResponse from "../utlis/ApiResponse.js";
import moment from "moment";
import axios from "axios";

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

const employeeLogin = async (req, res) => {
  try {
    const { email, password, location } = req.body;

    // Find the employee by email
    const existingUser = await Employee.findOne({ email });

    if (!existingUser) {
      throw new ApiError(
        401,
        "Employee not found. Please check your employee email."
      );
    }

    // Check if the password matches
    const isValidPassword = await existingUser.isPasswordCorrect(password);
    if (!isValidPassword) {
      throw new ApiError(401, "Invalid password. Please try again.");
    }

    // Check if the user has already logged in today
    const today = moment().format("YYYY-MM-DD");
    if (existingUser.loginDate === today) {
      // If already logged in today, do not update the login time or date
      return res.status(200).json(new ApiResponse(200, existingUser, "User already logged in today"));
    }

    // Mark attendance as 'Present' for today
    try {
      await existingUser.markAttendance();
    } catch (error) {
      console.error("Error marking attendance:", error);
      throw new ApiError(500, "Failed to mark attendance. Please try again.");
    }

    // Capture current date and time
    const loginDate = today;
    const loginTime = moment().format("HH:mm:ss");
    existingUser.loginDate = loginDate;
    existingUser.loginTime = loginTime;

    // If location is provided, reverse geocode it to get the address
    let address = "";
    if (location && location.latitude && location.longitude) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse`,
          {
            params: {
              lat: location.latitude,
              lon: location.longitude,
              format: "json",
            },
          }
        );
        address = response.data.display_name || "Location not available";
      } catch (error) {
        console.error("Error fetching address from coordinates:", error);
        address = "Unable to fetch address";
      }
    }

    // Update the user's location in the database
    if (address) {
      existingUser.location = address;
    }

    // Save the login time, login date, and location in the database
    await existingUser.save();

    res
      .status(200)
      .json(new ApiResponse(200, existingUser, "User logged in successfully"));
  } catch (error) {
    console.error("Error during employee login:", error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

// get all user
const getAllUser = async (req, res) => {
  const user = await Employee.find().lean();

  if (!user) {
    throw new ApiError(401, "User data does not get");
  }

  // count the total number of registration
  const totalEmployees = await user.length;
  // console.log(totalEmployees);

  res.status(200).json(
    new ApiResponse(
      201,
      {
        user,
        totalEmployees,
      },
      "all registered user"
    )
  );
};

export { employeeRegister, getAllUser, employeeLogin };
