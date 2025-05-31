import { z } from "zod";

const createUserValidation = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name should be at least 3 characters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(3, { message: "Password should be at least 3 characters" }),
  })
  .strict();

const loginUserValidation = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(3, { message: "Password should be at least e characters" }),
  })
  .strict();

export const userValidationSchema = {
  createUserValidation,
  loginUserValidation,
};
