import { z } from "../../../lib/external.lib";
import { SchemaValidationUtils } from "../../../lib/internal.lib";

class AuthSchemasValidation {
  public static register = z.object({
    body: z
      .object({
        email: SchemaValidationUtils.email,
        password: SchemaValidationUtils.password,
        passwordConfirmation: SchemaValidationUtils.passwordConfirmation,
        termsAndConditions: SchemaValidationUtils.termsAndConditions,
      })
      .refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
      }),
  });

  public static login = z.object({
    body: z.object({
      email: SchemaValidationUtils.email,
      password: SchemaValidationUtils.password,
    }),
  });

  public static forgotPassword = z.object({
    body: z.object({
      email: SchemaValidationUtils.email,
    }),
  });

  public static logout = z.object({
    body: z.object({}),
  });

  public static resetPassword = z.object({
    body: z
      .object({
        email: SchemaValidationUtils.email,
        code: SchemaValidationUtils.resetPasswordCode,
        newPassword: SchemaValidationUtils.newPassword,
        passwordConfirmation: SchemaValidationUtils.passwordConfirmation,
      })
      .refine((data) => data.newPassword === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
      }),
  });
}

export { AuthSchemasValidation };
