import express from "express";
import cors from "cors";
import router from "./global_routes.js";
import { sendErrorResponse } from "./utilities/customErrorResponse.js";
import path from "path";
import { Url } from "./modules/url/url.model.js";
import { User } from "./modules/user/user.model.js";
import cookieParser from "cookie-parser";
import ejs from "ejs";

// creating an express app

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "public")));
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self';",
      // Add 'https://cdn.jsdelivr.net' to allow SweetAlert2 CDN
      "script-src 'self' https://cdn.tailwindcss.com https://cdn.jsdelivr.net;",
      "style-src 'self' 'unsafe-inline';",
      "connect-src 'self' https://www.viralvabi.com;",
    ].join(" ")
  );
  next();
});

app.use("/", router);

// REDIRECTION LOGIC TO THE ACTUAL URL
app.all("/download/:key", async (req, res) => {
  const key = req.params.key;
  if (!key) {
    return res.render("pages/404");
  }
  try {
    // load the actual URL from the database
    const urlModelInstance = await Url.findOne({
      key: key,
      isDeleted: false,
    });
    if (!urlModelInstance) {
      return res.render("pages/404");
    }
    const actualUrl = urlModelInstance.actual_url;
    if (!actualUrl) {
      return res.render("pages/404");
    }
    // load the user associated with the URL
    const user = await User.findOne({
      _id: urlModelInstance.user_id,
    });
    // increment the click_count for the URL in the user collection
    if (!user || user.isDeleted || user.isBlocked || !user.isActivated) {
      return res.render("pages/404");
    }
    urlModelInstance.click_count += 1;
    await urlModelInstance.save();
    res.redirect(301, urlModelInstance.actual_url);
    return;
  } catch (error) {
    return res.render("pages/404");
  }
});

// creating a route not found middleware
app.all("/", (req, res) => {
  res.redirect("/web");
});
// creating an error handling middleware
app.use((error, req, res, next) => {
  sendErrorResponse(
    res,
    error.statusCode || 500,
    error.message || "Internal Server Error"
  );
});

// At the very end of your route definitions
app.use((req, res) => {
  res.render("pages/404");
});
export default app;
