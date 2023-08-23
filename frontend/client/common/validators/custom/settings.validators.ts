import { z, GeneralSchemasValidator } from "@/common/validators";

class SettingsSchemasValidators {
  public static changeGeneralInformation = z.object({
    firstName: GeneralSchemasValidator.firstName,
    lastName: GeneralSchemasValidator.lastName,
    email: GeneralSchemasValidator.email,
    phoneNumber: GeneralSchemasValidator.phoneNumber,
    country: GeneralSchemasValidator.country,
    city: GeneralSchemasValidator.city,
    address: GeneralSchemasValidator.address,
    zipPostalCode: GeneralSchemasValidator.zipPostalCode,
    department: GeneralSchemasValidator.departmentName,
    position: GeneralSchemasValidator.position,
    organization: GeneralSchemasValidator.organizationName,
    birthday: GeneralSchemasValidator.birthday,
  });
  public static revokeSessions = z.object({
    sessionsIds: z.array(GeneralSchemasValidator.sessionId),
  });
  public static changeEmailPreference = z.object({
    newsletter: GeneralSchemasValidator.isNewsLetter,
    tickets: GeneralSchemasValidator.isTickets,
    messages: GeneralSchemasValidator.isMessages,
    virtualAssistant: GeneralSchemasValidator.isVirtualAssistant,
    accountActivity: GeneralSchemasValidator.isAccountActivity,
    usersActivity: GeneralSchemasValidator.isUsersActivity,
  });
  public static changeNotificationPreference = z.object({
    body: z.object({
      newsletter: GeneralSchemasValidator.isNewsLetter,
      tickets: GeneralSchemasValidator.isTickets,
      messages: GeneralSchemasValidator.isMessages,
      virtualAssistant: GeneralSchemasValidator.isVirtualAssistant,
      accountActivity: GeneralSchemasValidator.isAccountActivity,
      usersActivity: GeneralSchemasValidator.isUsersActivity,
    }),
  });
  public static changePassword = z
    .object({
      oldPassword: GeneralSchemasValidator.oldPassword,
      newPassword: GeneralSchemasValidator.newPassword,
      passwordConfirmation: GeneralSchemasValidator.passwordConfirmation,
    })
    .refine((data) => data.newPassword === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
      message: "New password must be different from old password",
      path: ["newPassword"],
    });
  public static changeGeneralPreference = z.object({
    language: GeneralSchemasValidator.language,
    timeZone: GeneralSchemasValidator.timeZone,
    theme: GeneralSchemasValidator.theme,
    fontSize: GeneralSchemasValidator.fontSize,
  });
  public static changeProfilePicture = z.object({});
  public static getProfile = z.object({});
}

export { SettingsSchemasValidators };
