import jwt from "jsonwebtoken";
import { environmentVariables } from "../environments/environmentAccess.js";

export const loggedOutUsersOnly = (req, res, next) => {
  const { authorization } = req.cookies;

  try {
    if (authorization) {
      jwt.verify(authorization, environmentVariables.jwt_secret);

      // res.render("pages/home", {
      //   title: "Home",
      //   user: true,
      // });
      res.redirect("/web"); // Redirect to dashboard if user is logged in
    } else {
      return next();
    }
  } catch (error) {
    return next();
  }
};
