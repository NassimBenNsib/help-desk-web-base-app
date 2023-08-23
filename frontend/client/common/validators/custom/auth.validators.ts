import { GeneralSchemasValidator, z } from "@/common/validators/core";

class AuthSchemasValidators {
  public static register = z
    .object({
      email: GeneralSchemasValidator.email,
      password: GeneralSchemasValidator.password,
      passwordConfirmation: GeneralSchemasValidator.passwordConfirmation,
      termsAndConditions: GeneralSchemasValidator.termsAndConditions,
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    });

  public static login = z.object({
    email: GeneralSchemasValidator.email,
    password: GeneralSchemasValidator.password,
  });

  public static forgotPassword = z.object({
    email: GeneralSchemasValidator.email,
    termsAndConditions: GeneralSchemasValidator.termsAndConditions,
  });

  public static logout = z.object({
    body: z.object({}),
  });

  public static resetPassword = z
    .object({
      email: GeneralSchemasValidator.email,
      code: GeneralSchemasValidator.resetPasswordCode,
      newPassword: GeneralSchemasValidator.newPassword,
      passwordConfirmation: GeneralSchemasValidator.passwordConfirmation,
      termsAndConditions: GeneralSchemasValidator.termsAndConditions,
    })
    .refine((data) => data.newPassword === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    });
}

export { AuthSchemasValidators };
