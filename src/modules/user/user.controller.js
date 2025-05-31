import { sendErrorResponse } from "../../utilities/customErrorResponse.js";
import { sendSuccessResponse } from "../../utilities/customSuccessResponse.js";
import { tokenGenerator } from "../../utilities/tokenGenerator.js";
import { User } from "./user.model.js";
import { userValidationSchema } from "./user.validation.js";

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const validatedData = userValidationSchema.createUserValidation.safeParse(
    req?.body
  );
  if (!validatedData.success) {
    sendErrorResponse(
      res,
      400,
      validatedData?.error?.errors[0]?.message || "Invalid user data provided"
    );
    return;
  }
  try {
    // Here you would typically check if the user already exists in the database
    const user = await User.findOne({
      email,
      isDeleted: false,
      isActivated: true,
      isBlocked: false,
    });

    if (user) {
      return sendErrorResponse(res, 400, "User already exists with this email");
    }
    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password,
    });
    // send a success response
    sendSuccessResponse(res, 201, "User registered successfully", {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        photoUrl: newUser.photoUrl,
      },
    });
  } catch (error) {
    sendErrorResponse(res, 500, error?.message || "Internal server error");
    return;
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const validatedData = userValidationSchema.loginUserValidation.safeParse(
    req?.body
  );
  if (!validatedData.success) {
    return sendErrorResponse(
      res,
      400,
      validatedData.error.errors[0].message || "Invalid login data provided"
    );
  }
  try {
    // Here you would typically check if the user exists in the database
    const user = await User.find({ email }).select("+password");

    if (!user || user.length === 0) {
      return sendErrorResponse(res, 400, "User does not exist with this email");
    }
    // Check if the password matches
    if (password !== user[0].password) {
      return sendErrorResponse(res, 400, "Incorrect password");
    }
    // Generate a token for the user
    const token = tokenGenerator(user[0]._id, user[0].email, user[0].name);
    // send a success response
    sendSuccessResponse(res, 200, "User logged in successfully", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photoUrl: user.photoUrl,
      },
      token,
    });
  } catch (error) {
    sendErrorResponse(res, 500, error?.message || "Internal server error");
  }
};

const getMe = async (req, res, next) => {
  const { user } = req.params;
  try {
    // Here you would typically fetch the user from the database
    const userData = await User.findById(user);

    if (
      !userData ||
      userData.isDeleted ||
      userData.isBlocked ||
      !userData.isActivated
    ) {
      return sendErrorResponse(res, 404, "User not found");
    }

    // send a success response
    sendSuccessResponse(res, 200, "User data fetched successfully", {
      user: userData,
    });
  } catch (error) {
    sendErrorResponse(res, 500, error?.message || "Internal server error");
  }
};

export const userControllers = {
  registerUser,
  loginUser,
  getMe,
};
