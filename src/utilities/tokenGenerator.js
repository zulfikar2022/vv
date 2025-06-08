import jwt from "jsonwebtoken";
import { environmentVariables } from "../environments/environmentAccess.js";
export const tokenGenerator = (user_id, email, name, role = "user") => {
  try {
    if (!user_id || !email || !name) {
      throw new Error("Missing required user information");
    }
    const payload = {
      user_id,
      email,
      name,
      role,
    };
    const secretKey = environmentVariables.jwt_secret;
    const options = {
      expiresIn: "10d", // Token will expire in 10 days
    };
    return jwt.sign(payload, secretKey, options);
  } catch (error) {
    throw new Error("Token generation failed");
  }
};
