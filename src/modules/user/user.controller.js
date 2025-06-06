import { sendErrorResponse } from "../../utilities/customErrorResponse.js";
import { sendSuccessResponse } from "../../utilities/customSuccessResponse.js";
import { sendVerificationEmail } from "../../utilities/mail/mailer.js";
import { tokenGenerator } from "../../utilities/tokenGenerator.js";
import { User } from "./user.model.js";
import { userValidationSchema } from "./user.validation.js";

const registerUser = async (req, res, next) => {
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
    const { name, email, password } = req.body;

    const user = await User.findOne({
      email,
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
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        photoUrl: newUser.photoUrl,
      },
    });
    await sendVerificationEmail(newUser.email, newUser._id);
  } catch (error) {
    sendErrorResponse(res, 500, error?.message || "Internal server error");
    return;
  }
};

const loginUser = async (req, res, next) => {
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
    const { email, password } = req.body;
    // Here you would typically check if the user exists in the database
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return sendErrorResponse(res, 400, "User does not exist with this email");
    }
    // Check if the password matches
    if (password !== user.password) {
      return sendErrorResponse(res, 400, "Incorrect password");
    }
    if (!user.isActivated || user.isDeleted || user.isBlocked) {
      return sendErrorResponse(
        res,
        403,
        "User account is not active or blocked"
      );
    }
    // Generate a token for the user
    const token = tokenGenerator(user._id, user.email, user.name);
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
  console.log("getMe called");
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
