import { environmentVariables } from "../../environments/environmentAccess.js";
import { sendErrorResponse } from "../../utilities/customErrorResponse.js";
import { sendSuccessResponse } from "../../utilities/customSuccessResponse.js";
import { User } from "../user/user.model.js";
import { Url } from "./url.model.js";
import { urlValidation } from "./url.validation.js";
import path from "path";

const getAllUrlsOfUser = async (req, res) => {
  const { user } = req?.params;
  try {
    // finding the user intended to get urls
    const urls = await Url.find({ user_id: user, isDeleted: false }).exec();
    if (!urls || urls.length === 0) {
      sendErrorResponse(res, 404, "No URLs found for this user");
      return;
    }
    sendSuccessResponse(res, 200, "URLs retrieved successfully", urls);
  } catch (error) {
    sendErrorResponse(res, 500, error?.message || "Internal server error");
  }
};
const getSpecificUrlOfUser = async (req, res) => {
  const { user, url } = req?.params;
  try {
    // finding the user intended to get specific url
    const specificUrl = await Url.findOne({ user_id: user, _id: url }).exec();
    if (!specificUrl) {
      sendErrorResponse(res, 404, "URL not found.");
      return;
    }
    sendSuccessResponse(res, 200, "URL retrieved successfully", specificUrl);
  } catch (error) {
    sendErrorResponse(res, 500, error?.message || "Internal server error");
  }
};

const createUrlForUser = async (req, res) => {
  const { user } = req?.params;
  const validatedUrl = urlValidation.createUrlValidation.safeParse(req.body);
  if (!validatedUrl.success) {
    sendErrorResponse(
      res,
      400,
      validatedUrl?.error?.errors || "Invalid URL data provided"
    );
    return;
  }
  const { actual_url } = validatedUrl.data;
  try {
    // finding the user intended to create url
    const { total_url, isPaid } = req.urlUser;
    if (!isPaid && total_url >= environmentVariables.free_url_limit) {
      sendErrorResponse(res, 500, "You have reached the free plan.");
      return;
    }
    // get the last entry of the urls collection using Url model
    const lastUrl = await Url.findOne().sort({ createdAt: -1 }).exec();
    const newKey = lastUrl ? parseInt(lastUrl.key) + 1 : 1;

    // look for the actual url already exists in the database
    const existingUrl = await Url.findOne({
      actual_url,
      user_id: user,
      isDeleted: false,
    });
    if (existingUrl) {
      sendErrorResponse(
        res,
        400,
        "This URL already exists. Please use a different URL."
      );
      return;
    }

    const newUrl = {
      key: newKey.toString(),
      actual_url,
      user_id: user,
    };

    const createdUrl = await Url.create(newUrl);
    await User.findByIdAndUpdate(user, {
      $set: { total_url: total_url + 1 },
    });
    sendSuccessResponse(res, 201, "URL created successfully", createdUrl);
  } catch (error) {
    sendErrorResponse(res, 500, error?.message || "Internal server error");
  }
};

const updateUrlForUser = async (req, res) => {
  const { user, url } = req?.params;

  const validatedUrl = urlValidation.createUrlValidation.safeParse(req.body);
  if (!validatedUrl.success) {
    sendErrorResponse(
      res,
      400,
      validatedUrl?.error?.errors || "Invalid URL data provided"
    );
    return;
  }
  const { actual_url } = validatedUrl.data;

  try {
    const targetUrl = await Url.findById(url);
    if (targetUrl.isDeleted) {
      sendErrorResponse(res, 400, "URL is already deleted");
      return;
    }
    if (targetUrl.user_id.toString() !== req.urlUser._id.toString()) {
      sendErrorResponse(res, 400, "You are not the owner of that url.");
      return;
    }
    targetUrl.actual_url = actual_url;
    const changedUrl = await targetUrl.save();
    sendSuccessResponse(res, 200, "URL updated successfully", changedUrl);
  } catch (error) {
    sendErrorResponse(res, 400, error?.message || "Failed to update URL");
  }
};

const deleteUrlForUser = async (req, res) => {
  const { user, url } = req?.params;
  try {
    // finding the user intended to delete url
    const deletedUrl = await Url.findOneAndUpdate(
      {
        user_id: user,
        _id: url,
        isDeleted: false,
      },
      {
        isDeleted: true,
      }
    ).exec();
    if (!deletedUrl) {
      sendErrorResponse(res, 404, "URL not found.");
      return;
    }
    const { total_url } = req.urlUser;

    await User.findByIdAndUpdate(user, {
      $set: { total_url: total_url - 1 },
    });
    sendSuccessResponse(res, 200, "URL deleted successfully", deletedUrl);
  } catch (error) {
    sendErrorResponse(res, 500, error?.message || "Internal server error");
  }
};

const verifyUser = async (req, res) => {
  console.log("Verifying user...");
  try {
    const { user } = req.params;

    const intendedUser = await User.findById(user);
    if (!intendedUser) {
      return res.sendFile(
        path.join(
          process.cwd(),
          "src",
          "errors",
          "auth-errors",
          "user-does-not-exist.html"
        )
      );
    }

    if (intendedUser?.isActivated) {
      return res.sendFile(
        path.join(
          process.cwd(),
          "src",
          "errors",
          "auth-errors",
          "user-already-verified.html"
        )
      );
    }

    const mongoTime = new Date(intendedUser.createdAt);
    const now = new Date();
    const timeDifference = now - mongoTime;
    if (timeDifference >= 86400000) {
      // 24 hours in milliseconds
      return res.sendFile(
        path.join(
          process.cwd(),
          "src",
          "errors",
          "auth-errors",
          "user-verification-link-expired.html"
        )
      );
    }

    intendedUser.isActivated = true;
    await intendedUser.save();
    return res.sendFile(
      path.join(process.cwd(), "src", "web", "success", "user-verified.html")
    );
  } catch (error) {
    return res.render("pages/404");
  }
};

export const urlControllers = {
  getAllUrlsOfUser,
  getSpecificUrlOfUser,
  createUrlForUser,
  updateUrlForUser,
  deleteUrlForUser,
  verifyUser,
};
