import { environmentVariables } from "../environments/environmentAccess.js";
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
const dashboardPageController = (req, res) => {
  console.log("Dashboard route accessed");
  res.render("pages/dashboard", {
    title: "Dashboard",
  });
};

export const webControllers = {
  homePage: homePageController,
  loginPage: loginPageController,
  registerPage: registerPageController,
  profilePage: profilePageController,
  dashboardPage: dashboardPageController,
};
