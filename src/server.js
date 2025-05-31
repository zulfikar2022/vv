import mongoose from "mongoose";
import { environmentVariables } from "./environments/environmentAccess.js";
import app from "./app.js";

(async () => {
  const version = environmentVariables.version;

  try {
    version === "production" &&
      (await mongoose.connect(environmentVariables.database_connection_string));
    version !== "production" &&
      (await mongoose.connect("mongodb://localhost:27017/viral-vabi"));
    console.log(`Database is connected successfully!`);
    app.listen(environmentVariables.default_port, () => {
      console.log(
        `The server is running on port ${environmentVariables.default_port}`
      );
    });
  } catch (error) {
    console.log("Failed to start the server.");
  }
})();
