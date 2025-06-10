import express from "express";
import path from "path";
import { webControllers } from "./controllers.js";
import { loggedInUsersOnly } from "../middlewares/loggedInUsersOnly.js";
import { loggedOutUsersOnly } from "../middlewares/loggedOutUsersOnly.js";

const router = express.Router();

router.get("/", webControllers.homePage);
router.get("/login", loggedOutUsersOnly, webControllers.loginPage);
router.get("/register", loggedOutUsersOnly, webControllers.registerPage);
router.get("/profile", loggedInUsersOnly, webControllers.profilePage);
router.get("/dashboard", loggedInUsersOnly, webControllers.dashboardPage);

export const webRoutes = router;
