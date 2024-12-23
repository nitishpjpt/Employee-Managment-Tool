import { User } from "../modules/user_models.js";
import ApiError from "../utlis/ApiError.js";
import ApiResponse from "../utlis/ApiResponse.js";
import jwt from "jsonwebtoken";

// Generate access token function
const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    const accessToken = user.generateAccessToken();
    console.log(accessToken);

    // Ensure that the token is generated before saving
    await user.save({ validateBeforeSave: false });

    return { accessToken };
  } catch (error) {
    // Handle errors gracefully
    throw new ApiError(
      500,
      "Error while generating access token: " + error.message
    );
  }
};

// User Register Controller
const userRegister = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { username, email, password, firstName, lastName, contactId } =
      req.body;

    if (
      [username, email, password, contactId].some(
        (field) => !field || !field.trim()
      )
    ) {
      throw new ApiError(409, "User details are incomplete.");
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { contactId }],
    });

    if (existingUser) {
      throw new ApiError(409, "User with these details already exists.");
    }

    const user = await User.create({
      username,
      email,
      password,
      contactId,
      firstName,
      lastName,
    });

    if (!user) {
      throw new ApiError(500, "User could not be created. Please try again.");
    }

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "User was created but failed to fetch.");
    }

    res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User Registered Successfully"));
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
};

// User Login Controller
const userLogin = async (req, res) => {
  try {
    console.log("Login Request Body:", req.body);

    const { username, email, password } = req.body;

    if ((!username && !email) || !password?.trim()) {
      throw new ApiError(
        401,
        "Login details are incomplete. Provide either username or email and a password."
      );
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (!existingUser) {
      throw new ApiError(
        401,
        "User not found. Please check your username or email."
      );
    }

    const isValidPassword = await existingUser.isPasswordCorrect(password);

    if (!isValidPassword) {
      throw new ApiError(401, "Invalid password. Please try again.");
    }
      
    const { accessToken } = await generateAccessToken(existingUser._id);
      
    const userResponse = await User.findById(existingUser._id).select(
      "-password -accessToken"
    );

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
          { userResponse, accessToken },
          "User logged in successfully"
        )
      );
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
};

export { userRegister, userLogin };
