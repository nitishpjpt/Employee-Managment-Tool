import { Employee } from "../modules/employee_modules.js";
import ApiError from "../utlis/ApiError.js";
import ApiResponse from "../utlis/ApiResponse.js";
import moment from "moment";
import axios from "axios";

// Generate access token function
const generateAccessToken = async (userId) => {
  const user = await Employee.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found.");
  }
  const accessToken = user.generateAccessToken(); // Ensure this method exists
  await user.save({ validateBeforeSave: false }); // Save any changes if necessary
  return { accessToken };
};

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

    console.log("employee login:", req.body);

    // Find the employee by email
    const existingUser = await Employee.findOne({ email });

    if (!existingUser) {
      throw new ApiError(404, "Employee not found with this email");
    }

    // existing user valid then generate access token
    // generate access token
    const { accessToken } = await generateAccessToken(existingUser._id);
    console.log(accessToken);
    if (!accessToken) {
      throw new ApiError(500, "Failed to generate access token.");
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

      const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set secure flag for production
      };
      
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
          new ApiResponse(200, {existingUser,accessToken}, "User already logged in today")
        );
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
    const userResponse = await User.findById(existingUser._id).select(
      "-password -accessToken"
    );

    await existingUser.save();

   

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          { userResponse, accessToken },
          "Employee login successfully"
        )
      );
  } catch (error) {
    console.error("Error during employee login:", error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
};
const employeeLogout = async (req, res) => {
  try {
    // Get employeeId from URL parameter
    const { employeeId } = req.params;

    // Find employee by ID
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found. Please check your employee email.",
      });
    }

    // Capture the current time as logout time
    const logoutTime = moment().format("HH:mm:ss");

    // Set logout time in the employee record
    employee.logoutTime = logoutTime;

    // Save the updated employee record
    await employee.save();

    // Logic to handle logout (e.g., clear session or token)
    // If you are using a token, invalidate it here or perform any necessary actions

    return res.status(200).json({
      success: true,
      message: "Employee successfully logged out.",
      logoutTime,
    });
  } catch (error) {
    console.error("Error during employee logout:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
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

export { employeeRegister, getAllUser, employeeLogin, employeeLogout };
