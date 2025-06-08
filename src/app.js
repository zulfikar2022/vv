import express from "express";
import cors from "cors";
import router from "./global_routes.js";
import { sendErrorResponse } from "./utilities/customErrorResponse.js";
import path from "path";
import { Url } from "./modules/url/url.model.js";
import { User } from "./modules/user/user.model.js";
import cookieParser from "cookie-parser";

// creating an express app

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' https://www.viralvabi.com;"
  );
  next();
});
app.use("/", router);

// creating a route not found middleware
// app.all("*", (req, res) => {
//   sendErrorResponse(res, 404, `Can't find ${req.originalUrl} on this server`);
// });

// REDIRECTION LOGIC TO THE ACTUAL URL
app.all("/download/:key", async (req, res) => {
  const key = req.params.key;
  if (!key) {
    return res.sendFile(path.join(process.cwd(), "src", "errors", "404.html"));
  }
  try {
    // load the actual URL from the database
    const urlModelInstance = await Url.findOne({
      key: key,
      isDeleted: false,
    });
    if (!urlModelInstance) {
      return res.sendFile(
        path.join(process.cwd(), "src", "errors", "404.html")
      );
    }
    const actualUrl = urlModelInstance.actual_url;
    if (!actualUrl) {
      return res.sendFile(
        path.join(process.cwd(), "src", "errors", "404.html")
      );
    }
    // load the user associated with the URL
    const user = await User.findOne({
      _id: urlModelInstance.user_id,
    });
    // increment the click_count for the URL in the user collection
    if (!user || user.isDeleted || user.isBlocked || !user.isActivated) {
      return res.sendFile(
        path.join(process.cwd(), "src", "errors", "404.html")
      );
    }
    urlModelInstance.click_count += 1;
    await urlModelInstance.save();
    res.redirect(301, urlModelInstance.actual_url);
    return;
  } catch (error) {
    path.join(process.cwd(), "src", "errors", "404.html");
  }
});

// creating a route not found middleware
app.all("/", (req, res) => {
  // sendErrorResponse(res, 404, `Can't find ${req.originalUrl} on this server`);
  res.send({
    message: "Welcome to the URL Shortener API",
    version: "1.0.0",
    description: "This is a simple URL shortener API built with Express.js",
  });
});
// creating an error handling middleware
app.use((error, req, res, next) => {
  sendErrorResponse(
    res,
    error.statusCode || 500,
    error.message || "Internal Server Error"
  );
});
export default app;
