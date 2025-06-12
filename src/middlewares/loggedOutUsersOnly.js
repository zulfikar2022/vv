import jwt from "jsonwebtoken";
import { environmentVariables } from "../environments/environmentAccess.js";

export const loggedOutUsersOnly = async (req, res, next) => {
  const { authorization } = req.cookies;

  try {
    if (authorization) {
      jwt.verify(authorization, environmentVariables.jwt_secret);
      res.redirect("/web");
    } else {
      return next();
    }
  } catch (error) {
    return next();
  }
};
