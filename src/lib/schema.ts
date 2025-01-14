import { z } from "zod";

export const signInFormSchema = z.object({
  username: z.string().trim().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(1, {
    message: "Password shouldn't be empty",
  }),
});

export const signUpFormSchema = z
  .object({
    username: z.string().trim().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(1, {
      message: "Password shouldn't be empty",
    }),
    passwordConfirm: z.string(),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["passwordConfirm"],
      });
    }
  });

export const newBookFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  author: z.string().trim().min(2, "Author must be at least 2 characters."),
  description: z.string().optional(),
  publisher: z.string().optional(),
});
