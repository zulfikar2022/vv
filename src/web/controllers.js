import { environmentVariables } from "../environments/environmentAccess.js";
import { Url } from "../modules/url/url.model.js";
import { User } from "../modules/user/user.model.js";
import jwt from "jsonwebtoken";

const homePageController = (req, res) => {
  const { authorization } = req.cookies;
  try {
    if (!authorization) {
      res.render("pages/home", {
        title: "Home",
        user: null,
      });
      return;
    }
    jwt.verify(authorization, environmentVariables.jwt_secret);

    res.render("pages/home", {
      title: "Home",
      user: true,
    });
  } catch (error) {
    res.render("pages/home", {
      title: "Home",
      user: null,
    });
  }
};

const loginPageController = (req, res) => {
  res.render("pages/login", {
    title: "Login",
  });
};

const registerPageController = (req, res) => {
  console.log("Register route accessed");
  res.render("pages/register", {
    title: "Register",
  });
};

const profilePageController = (req, res) => {
  console.log("Profile route accessed");
  res.render("pages/profile", {
    title: "Profile",
  });
};
const dashboardPageController = async (req, res) => {
  const user = req.urlUser;

  try {
    if (user) {
      const urls = await Url.find({
        user_id: user._id,
      });
      res.render("pages/dashboard", {
        title: "Dashboard",
        userId: user._id,
        urls,
      });
    } else {
      res.redirect("/web/login");
    }
  } catch (error) {
    res.redirect("/web/login");
  }
};

export const webControllers = {
  homePage: homePageController,
  loginPage: loginPageController,
  registerPage: registerPageController,
  profilePage: profilePageController,
  dashboardPage: dashboardPageController,
};
