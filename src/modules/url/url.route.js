import express from "express";
import { urlControllers } from "./url.controller.js";
import { usersOnly } from "../../middlewares/usersOnly.js";

const router = express.Router();
// This file is the entry point for all the urls routes
// router.post("/register", userControllers.registerUser);

router.get("/:user/urls", usersOnly, urlControllers.getAllUrlsOfUser); // DONE
router.get("/:user/urls/:url", usersOnly, urlControllers.getSpecificUrlOfUser); // DONE

router.post("/:user/urls", usersOnly, urlControllers.createUrlForUser); // DONE

router.put("/:user/urls/:url", usersOnly, urlControllers.updateUrlForUser);
router.delete("/:user/urls/:url", usersOnly, urlControllers.deleteUrlForUser); // DONE

// router.get("/verification/:user");

export const urlRoutes = router;
