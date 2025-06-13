import express from "express";
import { webControllers } from "./controllers.js";
import { loggedInUsersOnly } from "../middlewares/loggedInUsersOnly.js";
import { loggedOutUsersOnly } from "../middlewares/loggedOutUsersOnly.js";
import { userControllers } from "../modules/user/user.controller.js";

const router = express.Router();

router.get("/", webControllers.homePage);

router.get("/profile", loggedInUsersOnly, webControllers.profilePage);
router.get("/dashboard", loggedInUsersOnly, webControllers.dashboardPage);
router.post("/logout", loggedInUsersOnly, userControllers.logoutUser);

router.get("/login", loggedOutUsersOnly, webControllers.loginPage);
router.get("/register", loggedOutUsersOnly, webControllers.registerPage);

export const webRoutes = router;
