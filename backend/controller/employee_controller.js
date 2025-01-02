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
    salary
  } = req.body;

  console.log("Request Body:", req.body);
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
    salary
  });

  console.log("Employee:", employee);
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

    // Existing user is valid, generate access token
    const { accessToken } = await generateAccessToken(existingUser._id);
    if (!accessToken) {
      throw new ApiError(500, "Failed to generate access token.");
    }

    // Check if the password matches
    const isValidPassword = await existingUser.isPasswordCorrect(password);
    if (!isValidPassword) {
      throw new ApiError(401, "Invalid password. Please try again.");
    }

    // Get today's date
    const today = moment().format("YYYY-MM-DD");
    const currentLoginTime = moment().format("HH:mm:ss");

    // Find today's attendance record
    let attendanceRecord = existingUser.attendance.find(
      (att) => att.date === today
    );

    if (!attendanceRecord) {
      // If no attendance record exists for today, create one
      existingUser.attendance.push({
        date: today,
        status: "Present",
        loginTime: currentLoginTime, // Set login time on first login
      });
    } else {
      // If attendance record exists, check if loginTime is already set
      if (!attendanceRecord.loginTime) {
        // If loginTime is not set, update it with the current time (first login today)
        attendanceRecord.loginTime = currentLoginTime;
      }
    }

    // Update the `lastLoginTime` field outside the attendance array
    existingUser.lastLoginTime = currentLoginTime;

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

    // Update the user's location in the database if an address is available
    if (address) {
      existingUser.location = address;
    }

    // Save the updated employee data
    await existingUser.save();

    // Generate and send the access token as a cookie
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure flag for production
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          { userResponse: existingUser, accessToken },
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
        message: "Employee not found. Please check your employee ID.",
      });
    }

    // Capture the current date and time
    const currentDate = moment().format("YYYY-MM-DD");
    const logoutTime = moment().format("HH:mm:ss");

    // Check if the employee already has a logout time for today
    if (employee.lastLogoutDate === currentDate) {
      // Update the logout time for the same day
      employee.logoutTime = logoutTime;
    } else {
      // If it's a new day, clear the previous logout time and update the date
      employee.logoutTime = logoutTime;
      employee.lastLogoutDate = currentDate;
    }

    // Save the updated employee record
    await employee.save();

    return res.status(200).json({
      success: true,
      message: "Employee successfully logged out.",
      logoutTime,
      lastLogoutDate: employee.lastLogoutDate,
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
