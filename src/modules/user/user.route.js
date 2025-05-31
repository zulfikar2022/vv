import express from "express";
import { userControllers } from "./user.controller.js";
import { usersOnly } from "../../middlewares/usersOnly.js";

const router = express.Router();
// This file is the entry point for all the user routes
router.post("/register", userControllers.registerUser);

router.post("/login", userControllers.loginUser);
// router.get("/getme/:user", usersOnly, userControllers.getMe);
export const userRoute = router;
