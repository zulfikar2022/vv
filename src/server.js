import mongoose from "mongoose";
import { environmentVariables } from "./environments/environmentAccess.js";
import app from "./app.js";
import path from "path";
import dotenv from "dotenv";
const dotenvFilePath = path.join(process.cwd(), ".env");
dotenv.config({
  path: dotenvFilePath,
});

(async () => {
  const version = environmentVariables.version;

  try {
    version === "production" &&
      (await mongoose.connect(environmentVariables.database_connection_string));
    version !== "production" &&
      (await mongoose.connect("mongodb://localhost:27017/viral-vabi"));
    console.log(`Database is connected successfully!`);
    app.listen(process.env.PORT || 4000, () => {
      console.log(
        `The server is running on port ${environmentVariables.default_port}`
      );
    });
  } catch (error) {
    console.log("Failed to start the server.");
  }
})();
