import jwt from "jsonwebtoken";

import { sendErrorResponse } from "../utilities/customErrorResponse.js";
import { environmentVariables } from "../environments/environmentAccess.js";
import { User } from "../modules/user/user.model.js";

export const usersOnly = async (req, res, next) => {
  const { user } = req?.params;
  const { authorization } = req.headers;
  if (!user || !authorization) {
    sendErrorResponse(res, 403, "Forbidden: User not authenticated");
    return;
  }
  // Check if the user exists in the database
  try {
    const urlUser = await User.findById(user);
    if (!urlUser) {
      sendErrorResponse(res, 404, "User not found");
      return;
    }

    const verifiedData = jwt.verify(
      authorization,
      environmentVariables.jwt_secret
    );

    if (verifiedData.user_id !== user) {
      sendErrorResponse(res, 403, "Forbidden: User ID mismatch");
      return;
    }
    if (!urlUser.isActivated || urlUser.isBlocked || urlUser.isDeleted) {
      sendErrorResponse(
        res,
        403,
        "Forbidden: User is not active or blocked or deleted."
      );
      return;
    }
    // if the user exists and is active, proceed to the next middleware
    req.urlUser = urlUser;
    next();
  } catch (error) {
    sendErrorResponse(res, 500, error?.message || "Internal server error");
    return;
  }
};
