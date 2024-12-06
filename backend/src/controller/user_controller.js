import { User } from "../modules/user_models.js";
import ApiError from "../utlis/ApiError.js";
import ApiResponse from "../utlis/ApiResponse.js";

// new user register controller
const userRegister = async (req, res) => {
  console.log("Request Body:", req.body);
  const {
    username,
    email,
    password,
    organizationName,
    organizationSize,
    firstName,
    contactId,
  } = req.body;

  console.log(
    username,
    email,
    password,
    organizationName,
    organizationSize,
    contactId
  );

  // Check if all required fields are provided and valid
  if (
    [username, email, password, contactId].some(
      (field) => !field || !field.trim()
    )
    // organizationName === undefined ||
    // organizationSize === null
  ) {
    throw new ApiError(409, "User details are incomplete.");
  }

  // Check if the user already exists (based on unique fields like username, email, or contact_id)
  const existingUser = await User.findOne({
    $or: [{ username }, { email }, { contactId }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with these details already exists.");
  }

  // Create a new user in the database
  const user = await User.create({
    username,
    email,
    password,
    organizationSize,
    contactId,
    firstName,
  });

  if (!user) {
    throw new ApiError(500, "User could not be created. Please try again.");
  }

  // Fetch the created user, excluding sensitive fields like password and refreshToken
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "User was created");
  }

  // sned user reistered successfully
  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Registered Successfully"));
};

// user login controller
const userLogin = async (req, res) => {
  try {
    // console log the request
    console.log("Login Request Body:", req.body);

    // Extract login details from req.body
    const { username, email, password } = req.body;

    // check the input field are filled
    if ((!username && !email) || !password?.trim()) {
      throw new ApiError(
        401,
        "Login details are incomplete. Provide either username or email and a password."
      );
    }

    // Find the user with their username or email
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    // If the user is not found, throw an error
    if (!existingUser) {
      throw new ApiError(
        401,
        "User not found. Please check your username or email."
      );
    }

    // Check if the password matches
    const isValidPassword = await existingUser.isPasswordCorrect(password);

    // If the password does not match, throw an error
    if (!isValidPassword) {
      throw new ApiError(401, "Invalid password. Please try again.");
    }

    // Send a success response with the user details (excluding sensitive fields)
    const userResponse = await User.findById(existingUser._id).select(
      "-password -refreshToken"
    );

    res
      .status(200)
      .json(new ApiResponse(200, userResponse, "User logged in successfully"));
  } catch (error) {
    // Catch and handle errors
    res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
};

export { userRegister, userLogin };
