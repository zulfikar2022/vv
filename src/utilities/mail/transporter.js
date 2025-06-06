import nodemailer from "nodemailer";
import { environmentVariables } from "../../environments/environmentAccess.js";

export const transporter = nodemailer.createTransport({
  host: environmentVariables.smtp_host || "smtp-relay.brevo.com",
  port: environmentVariables.smtp_port || 587,
  secure: false, // use TLS
  auth: {
    user: environmentVariables.smtp_user,
    pass: environmentVariables.smtp_password,
  },
});
