import { environmentVariables } from "../environments/environmentAccess.js";

export const loggedInUsersOnly = (req, res, next) => {
  const { authorization } = req.cookies;

  try {
    if (!authorization) {
      return res.redirect("/web/login");
    }

    jwt.verify(authorization, environmentVariables.jwt_secret);
    next();
  } catch (error) {
    return res.redirect("/web/login");
  }
};
