import { z } from "zod";

const createUrlValidation = z
  .object({
    actual_url: z
      .string()
      .url("Invalid URL format")
      .min(1, "URL cannot be empty"),
  })
  .strict();

export const urlValidation = {
  createUrlValidation,
};
