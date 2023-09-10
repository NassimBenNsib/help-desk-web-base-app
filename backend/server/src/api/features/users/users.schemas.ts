import { z } from "../../../lib/external.lib";
import { SchemaValidationUtils } from "../../../lib/internal.lib";

class UsersSchemasValidation {}

class UsersSettingsSchemasValidation {
  public static changeGeneralInformation = z.object({
    body: z.object({
      firstName: SchemaValidationUtils.firstName,
      lastName: SchemaValidationUtils.lastName,
      email: SchemaValidationUtils.email,
      phoneNumber: SchemaValidationUtils.phoneNumber,
      country: SchemaValidationUtils.country,
      city: SchemaValidationUtils.city,
      address: SchemaValidationUtils.address,
      zipPostalCode: SchemaValidationUtils.zipPostalCode,
      department: SchemaValidationUtils.departmentName,
      position: SchemaValidationUtils.position,
      organization: SchemaValidationUtils.organizationName,
      birthday: SchemaValidationUtils.birthday,
    }),
  });
  public static revokeSessions = z.object({
    body: z.object({
      sessionsIds: z.array(SchemaValidationUtils.sessionId),
    }),
  });
  public static changeEmailPreference = z.object({
    body: z.object({
      newsletter: SchemaValidationUtils.isNewsLetter,
      tickets: SchemaValidationUtils.isTickets,
      messages: SchemaValidationUtils.isMessages,
      virtualAssistant: SchemaValidationUtils.isVirtualAssistant,
      accountActivity: SchemaValidationUtils.isAccountActivity,
      usersActivity: SchemaValidationUtils.isUsersActivity,
    }),
  });
  public static changeNotificationPreference = z.object({
    body: z.object({
      newsletter: SchemaValidationUtils.isNewsLetter,
      tickets: SchemaValidationUtils.isTickets,
      messages: SchemaValidationUtils.isMessages,
      virtualAssistant: SchemaValidationUtils.isVirtualAssistant,
      accountActivity: SchemaValidationUtils.isAccountActivity,
      usersActivity: SchemaValidationUtils.isUsersActivity,
    }),
  });
  public static changePassword = z.object({
    body: z
      .object({
        oldPassword: SchemaValidationUtils.oldPassword,
        newPassword: SchemaValidationUtils.newPassword,
        passwordConfirmation: SchemaValidationUtils.passwordConfirmation,
      })
      .refine((data) => data.newPassword === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
      })
      .refine((data) => data.oldPassword !== data.newPassword, {
        message: "New password must be different from old password",
        path: ["newPassword"],
      }),
  });
  public static changeGeneralPreference = z.object({
    body: z.object({
      language: SchemaValidationUtils.language,
      timeZone: SchemaValidationUtils.timeZone,
      theme: SchemaValidationUtils.theme,
      fontSize: SchemaValidationUtils.fontSize,
    }),
  });
  public static changeProfilePicture = z.object({
    body: z.object({}),
  });
  public static getProfile = z.object({
    body: z.object({}),
  });
}

export { UsersSchemasValidation, UsersSettingsSchemasValidation };
