import { environmentVariables } from "../environments/environmentAccess.js";
import { User } from "../modules/user/user.model.js";
import jwt from "jsonwebtoken";

export const loggedInUsersOnly = async (req, res, next) => {
  const { authorization } = req.cookies;

  try {
    if (!authorization) {
      return res.redirect("/web/login");
    }

    const decodedData = jwt.verify(
      authorization,
      environmentVariables.jwt_secret
    );

    const user = await User.findOne({
      _id: decodedData.user_id,
      isDeleted: false,
      isActivated: true,
    });

    if (!user) {
      return res.redirect("/web/login");
    }
    req.urlUser = user;
    next();
  } catch (error) {
    return res.redirect("/web/login");
  }
};
