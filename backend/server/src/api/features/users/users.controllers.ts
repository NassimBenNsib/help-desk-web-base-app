import { Response, Request } from "../../../lib/external.lib";
import {
  HashEncryptUtils,
  MailerServices,
  UsersStatusEnum,
  RequestUtils,
  AuthEmailTemplates,
  ResponseUtils,
  ConsoleUtils,
  COMPANY_CONFIG,
  NormalizerSerializerUtils,
  SessionsServices,
  UsersSettingsServices,
  FILE_UPLOAD_CONFIG,
} from "../../../lib/internal.lib";
import { UsersServices } from ".";

class UsersControllers {}
class UsersSettingsControllers {
  public static async changeGeneralInformation(
    request: Request,
    response: Response
  ) {
    try {
      // Prepare the data
      const {
        firstName,
        lastName,
        country,
        city,
        address,
        email,
        phoneNumber,
        birthday,
        organization,
        position,
        department,
        zipPostalCode,
      } = request.body;
      const currentUser = RequestUtils.getUser(request);
      const email_normalized = NormalizerSerializerUtils.normalizeEmail(email);
      let result: any = null;
      // Check if the email already exists
      if (email_normalized !== currentUser.email)
        if ((result = await UsersServices.findOneByEmail(email_normalized)))
          return response
            .status(400)
            .send(
              ResponseUtils.generateErrorMessage(
                400,
                "Change General Information Failed",
                "Email already exists",
                "The email you entered already exists.",
                "Please enter a different email.",
                null,
                null,
                null,
                null,
                request
              )
            );
      // Check if the changes applied
      if (
        !(result =
          await UsersSettingsServices.changeOneGeneralInformationByUserId(
            currentUser.id,
            {
              firstName,
              lastName,
              country,
              city,
              address,
              email,
              phoneNumber,
              birthday: new Date(birthday),
              organization,
              position,
              department,
              zipPostalCode,
            }
          ))
      )
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Change General Information Failed",
              "Unable to change general information.",
              "An unexpected error occurred during the process.",
              "Please try again later.",
              null,
              null,
              null,
              null,
              request
            )
          );
      // Notify the user by email
      // NotificationsServices.pushNotification(
      //   {
      //     company: COMPANY_CONFIG,
      //     user: result.profile,
      //     emailPreference: result.emailPreference,
      //     notificationPreference: result.notificationPreference,
      //   },
      //   {
      //     from: COMPANY_CONFIG.SUPPORT_EMAIL as string,
      //     to: email,
      //     subject: "Forgot Password Request",
      //     html: AuthEmailTemplates.register,
      //   },
      //   null,
      //   null,
      //   RequestUtils.getRequestInfo(request),
      //   true,
      //   "accountActivity"
      // );
      // If everything is ok, send the response
      return response.status(200).send(
        ResponseUtils.generateSuccessMessage(
          200,
          "General Information Changed Successfully",
          "General Information has been changed successfully.",
          "General Information has been changed successfully.",
          "",
          result,
          {
            ...result,
          },
          null,
          null,
          request
        )
      );
    } catch (error) {
      ConsoleUtils.error([
        "UsersSettingsControllers",
        "changeGeneralInformation",
        "BEGIN ERROR",
      ]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn([
        "UsersSettingsControllers",
        "changeGeneralInformation",
        "END ERROR",
      ]);
      return response
        .status(500)
        .send(
          ResponseUtils.generateErrorMessage(
            500,
            "Change General Information Failed",
            "Unable to change general information.",
            "An unexpected error occurred during the process.",
            "Please try again later.",
            null,
            null,
            error,
            null,
            request
          )
        );
    }
  }

  public static async revokeSessions(request: Request, response: Response) {
    try {
      // Prepare the data
      const { sessionsIds } = request.body;
      const currentUser = RequestUtils.getUser(request);
      const currentSession = RequestUtils.getSession(request);
      let result;
      // Check if there are sessions selected
      if (sessionsIds.length === 0)
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Revoke Sessions Failed",
              "No sessions selected",
              "No sessions selected",
              "",
              null,
              null,
              null,
              null,
              request
            )
          );
      // Check if the current session is selected
      if (sessionsIds.includes(currentSession.id))
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Revoke Sessions Failed",
              "Cannot revoke current session",
              "Cannot revoke current session",
              "",
              null,
              null,
              null,
              null,
              request
            )
          );
      // Get all selected sessions
      const sessions = await SessionsServices.findManyByIds(sessionsIds);
      if (sessions.length !== sessionsIds.length)
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Revoke Sessions Failed",
              "Some sessions are invalid or do not exist",
              "Some sessions are invalid or do not exist",
              "Please selected valid and existing sessions.",
              null,
              null,
              null,
              null,
              request
            )
          );
      // Check if the sessions are yours
      if (
        !sessions.every((session: any) => {
          return session.userId === currentUser.id;
        })
      )
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Revoke Sessions Failed",
              "Some sessions are not related to your account",
              "Some sessions are not related to your account",
              "Please selected your own sessions.",
              null,
              null,
              null,
              null,
              request
            )
          );
      // Check if some sessions are already revoked
      if (
        !sessions.every((session: any) => {
          return session.revoked === false;
        })
      )
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Revoke Sessions Failed",
              "Some sessions are already revoked",
              "Some sessions are already revoked",
              "Please selected only active sessions.",
              null,
              null,
              null,
              null,
              request
            )
          );
      // Check if the changes applied
      result = result =
        await UsersSettingsServices.revokeManySessionsByIdsAndByUserId(
          currentUser.id,
          sessionsIds
        );
      if (!result)
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Revoke Sessions Failed",
              "Unable to revoke sessions.",
              "An unexpected error occurred during the process.",
              "Please try again later.",
              null,
              null,
              null,
              null,
              request
            )
          );

      // Notify the user by email
      // NotificationsServices.pushNotification(
      //   {
      //     company: COMPANY_CONFIG,
      //     user: result.profile,
      //     emailPreference: result.emailPreference,
      //     notificationPreference: result.notificationPreference,
      //   },
      //   {
      //     from: COMPANY_CONFIG.SUPPORT_EMAIL as string,
      //     to: email,
      //     subject: "Forgot Password Request",
      //     html: AuthEmailTemplates.register,
      //   },
      //   null,
      //   null,
      //   RequestUtils.getRequestInfo(request),
      //   true,
      //   "accountActivity"
      // );
      // If everything is ok, send the response
      return response
        .status(200)
        .send(
          ResponseUtils.generateSuccessMessage(
            200,
            "Revoke Sessions Successfully",
            "Sessions have been revoked successfully.",
            "Sessions have been revoked successfully.",
            "",
            null,
            null,
            null,
            null,
            request
          )
        );
    } catch (error: any) {
      ConsoleUtils.error([
        "UsersSettingsControllers",
        "revokeSessions",
        "BEGIN ERROR",
      ]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn([
        "UsersSettingsControllers",
        "revokeSessions",
        "END ERROR",
      ]);
      return response
        .status(500)
        .send(
          ResponseUtils.generateErrorMessage(
            500,
            "Revoke Sessions Failed",
            "Unable to revoke sessions.",
            "An unexpected error occurred during the process.",
            "Please try again later.",
            null,
            null,
            error,
            null,
            request
          )
        );
    }
  }

  public static async changeEmailPreference(
    request: Request,
    response: Response
  ) {
    try {
      // Prepare the data
      const {
        messages,
        tickets,
        virtualAssistant,
        accountActivity,
        newsletter,
        usersActivity,
      } = request.body;
      const currentUser = RequestUtils.getUser(request);
      let result: any = null;
      // Check if the changes applied
      if (
        !(result = await UsersSettingsServices.changeOneEmailPreferenceByUserId(
          currentUser.id,
          {
            messages,
            tickets,
            virtualAssistant,
            accountActivity,
            newsletter,
            usersActivity,
          }
        ))
      )
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Change Email Preference Failed",
              "Unable to change general information.",
              "An unexpected error occurred during the process.",
              "Please try again later.",
              null,
              null,
              null,
              null,
              request
            )
          );
      // Notify the user by email
      // NotificationsServices.pushNotification(
      //   {
      //     company: COMPANY_CONFIG,
      //     user: result.profile,
      //     emailPreference: result.emailPreference,
      //     notificationPreference: result.notificationPreference,
      //   },
      //   {
      //     from: COMPANY_CONFIG.SUPPORT_EMAIL as string,
      //     to: email,
      //     subject: "Forgot Password Request",
      //     html: AuthEmailTemplates.register,
      //   },
      //   null,
      //   null,
      //   RequestUtils.getRequestInfo(request),
      //   true,
      //   "accountActivity"
      // );
      // If everything is ok, send the response
      return response.status(200).send(
        ResponseUtils.generateSuccessMessage(
          200,
          "Change Email Preference Successfully",
          "Email Preference has been changed successfully.",
          "Email Preference has been changed successfully.",
          "",
          result,
          {
            ...result,
          },
          null,
          null,
          request
        )
      );
    } catch (error) {
      ConsoleUtils.error([
        "UsersSettingsControllers",
        "changeEmailPreference",
        "BEGIN ERROR",
      ]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn([
        "UsersSettingsControllers",
        "changeEmailPreference",
        "END ERROR",
      ]);
      return response
        .status(500)
        .send(
          ResponseUtils.generateErrorMessage(
            500,
            "Change Email Preference Failed",
            "Unable to change email preference.",
            "An unexpected error occurred during the process.",
            "Please try again later.",
            null,
            null,
            error,
            null,
            request
          )
        );
    }
  }

  public static async changeNotificationPreference(
    request: Request,
    response: Response
  ) {
    try {
      // Prepare the data
      const {
        messages,
        tickets,
        virtualAssistant,
        accountActivity,
        newsletter,
        usersActivity,
      } = request.body;
      const currentUser = RequestUtils.getUser(request);
      let result: any = null;
      // Check if the changes applied
      if (
        !(result =
          await UsersSettingsServices.changeOneNotificationPreferenceByUserId(
            currentUser.id,
            {
              messages,
              tickets,
              virtualAssistant,
              accountActivity,
              newsletter,
              usersActivity,
            }
          ))
      )
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Change Notification Preference Failed",
              "Unable to change general information.",
              "An unexpected error occurred during the process.",
              "Please try again later.",
              null,
              null,
              null,
              null,
              request
            )
          );
      // Notify the user by email
      // NotificationsServices.pushNotification(
      //   {
      //     company: COMPANY_CONFIG,
      //     user: result.profile,
      //     emailPreference: result.emailPreference,
      //     notificationPreference: result.notificationPreference,
      //   },
      //   {
      //     from: COMPANY_CONFIG.SUPPORT_EMAIL as string,
      //     to: email,
      //     subject: "Forgot Password Request",
      //     html: AuthEmailTemplates.register,
      //   },
      //   null,
      //   null,
      //   RequestUtils.getRequestInfo(request),
      //   true,
      //   "accountActivity"
      // );
      // If everything is ok, send the response
      return response.status(200).send(
        ResponseUtils.generateSuccessMessage(
          200,
          "Change Notification Preference Successfully",
          "Notification Preference has been changed successfully.",
          "Notification Preference has been changed successfully.",
          "",
          result,
          {
            ...result,
          },
          null,
          null,
          request
        )
      );
    } catch (error) {
      ConsoleUtils.error([
        "UsersSettingsControllers",
        "changeNotificationPreference",
        "BEGIN ERROR",
      ]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn([
        "UsersSettingsControllers",
        "changeNotificationPreference",
        "END ERROR",
      ]);
      return response
        .status(500)
        .send(
          ResponseUtils.generateErrorMessage(
            500,
            "Change Notification Preference Failed",
            "Unable to change notification preference.",
            "An unexpected error occurred during the process.",
            "Please try again later.",
            null,
            null,
            error,
            null,
            request
          )
        );
    }
  }

  public static async changePassword(request: Request, response: Response) {
    try {
      // Prepare the data
      const { newPassword, oldPassword } = request.body;
      const currentUser = RequestUtils.getUser(request);
      let result: any = null;
      // Check if the old password is correct
      if (
        !HashEncryptUtils.comparePasswordWithHashed(
          oldPassword,
          currentUser.salt,
          currentUser.password
        )
      )
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Change Password Failed",
              "The old password is incorrect.",
              "The old password is incorrect.",
              "Please try again with a valid password.",
              null,
              null,
              null,
              null,
              request
            )
          );
      // Check if the changes applied
      if (
        !(result =
          await UsersSettingsServices.changeOnePasswordPasswordByUserId(
            currentUser.id,
            newPassword
          ))
      )
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Change Password Failed",
              "Unable to change password.",
              "An unexpected error occurred during the process.",
              "Please try again later.",
              null,
              null,
              null,
              null,
              request
            )
          );
      // Notify the user by email
      // NotificationsServices.pushNotification(
      //   {
      //     company: COMPANY_CONFIG,
      //     user: result.profile,
      //     emailPreference: result.emailPreference,
      //     notificationPreference: result.notificationPreference,
      //   },
      //   {
      //     from: COMPANY_CONFIG.SUPPORT_EMAIL as string,
      //     to: email,
      //     subject: "Forgot Password Request",
      //     html: AuthEmailTemplates.register,
      //   },
      //   null,
      //   null,
      //   RequestUtils.getRequestInfo(request),
      //   true,
      //   "accountActivity"
      // );
      // If everything is ok, send the response
      return response.status(200).send(
        ResponseUtils.generateSuccessMessage(
          200,
          "Change Password Successfully",
          "Password has been changed successfully.",
          "Password has been changed successfully.",
          "",
          {
            ...result,
          },
          null,
          null,
          null,
          request
        )
      );
    } catch (error) {
      ConsoleUtils.error([
        "UsersSettingsControllers",
        "changePassword",
        "BEGIN ERROR",
      ]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn([
        "UsersSettingsControllers",
        "changePassword",
        "END ERROR",
      ]);
      return response
        .status(500)
        .send(
          ResponseUtils.generateErrorMessage(
            500,
            "Change Password Failed",
            "Unable to change password.",
            "An unexpected error occurred during the process.",
            "Please try again later.",
            null,
            null,
            error,
            null,
            request
          )
        );
    }
  }

  public static async changeGeneralPreference(
    request: Request,
    response: Response
  ) {
    try {
      // Prepare the data
      const { theme, language, timeZone, fontSize } = request.body;
      const currentUser = RequestUtils.getUser(request);
      let result: any = null;
      // Check if the changes applied
      if (
        !(result =
          await UsersSettingsServices.changeOneGeneralPreferenceByUserId(
            currentUser.id,
            {
              fontSize,
              theme,
              language,
              timeZone,
            }
          ))
      )
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Change General Preference Failed",
              "Unable to change general preference.",
              "An unexpected error occurred during the process.",
              "Please try again later.",
              null,
              null,
              null,
              null,
              request
            )
          );
      // Notify the user by email
      // NotificationsServices.pushNotification(
      //   {
      //     company: COMPANY_CONFIG,
      //     user: result.profile,
      //     emailPreference: result.emailPreference,
      //     notificationPreference: result.notificationPreference,
      //   },
      //   {
      //     from: COMPANY_CONFIG.SUPPORT_EMAIL as string,
      //     to: email,
      //     subject: "Forgot Password Request",
      //     html: AuthEmailTemplates.register,
      //   },
      //   null,
      //   null,
      //   RequestUtils.getRequestInfo(request),
      //   true,
      //   "accountActivity"
      // );
      // If everything is ok, send the response
      return response.status(200).send(
        ResponseUtils.generateSuccessMessage(
          200,
          "Change General Preference Successfully",
          "General preference has been changed successfully.",
          "General preference has been changed successfully.",
          "",
          result,
          {
            ...result,
          },
          null,
          null,
          request
        )
      );
    } catch (error) {
      ConsoleUtils.error([
        "UsersSettingsControllers",
        "changeGeneralPreference",
        "BEGIN ERROR",
      ]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn([
        "UsersSettingsControllers",
        "changeGeneralPreference",
        "END ERROR",
      ]);
      return response
        .status(500)
        .send(
          ResponseUtils.generateErrorMessage(
            500,
            "Change General Preference Failed",
            "Unable to change general preference.",
            "An unexpected error occurred during the process.",
            "Please try again later.",
            null,
            null,
            error,
            null,
            request
          )
        );
    }
  }

  public static async changeProfilePicture(
    request: Request,
    response: Response
  ) {
    try {
      // Prepare the data
      const currentUser = RequestUtils.getUser(request);

      console.log(request.file);
      if (!request?.file?.path)
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Change Profile Picture Failed",
              "No file uploaded.",
              "Please upload a file.",
              "Please try again later.",
              null,
              null,
              null,
              null,
              request
            )
          );
      const result =
        await UsersSettingsServices.changeOneProfilePictureByUserId(
          currentUser.id,
          request.file
        );
      if (!result)
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Change Profile Picture Failed",
              "Unable to change profile picture.",
              "An unexpected error occurred during the process.",
              "Please try again later.",
              null,
              null,
              null,
              null,
              request
            )
          );
      return response.status(200).send(
        ResponseUtils.generateSuccessMessage(
          200,
          "Change Profile Picture Successfully",
          "Profile picture has been changed successfully.",
          "Profile picture has been changed successfully.",
          "",
          result,
          {
            ...result,
          },
          null,
          null,
          request
        )
      );
    } catch (error) {
      ConsoleUtils.error([
        "UsersSettingsControllers",
        "changeProfilePicture",
        "BEGIN ERROR",
      ]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn([
        "UsersSettingsControllers",
        "changeProfilePicture",
        "END ERROR",
      ]);
      return response
        .status(500)
        .send(
          ResponseUtils.generateErrorMessage(
            500,
            "Change Profile Picture Failed",
            "Unable to change profile picture.",
            "An unexpected error occurred during the process.",
            "Please try again later.",
            null,
            null,
            error,
            null,
            request
          )
        );
    }
  }

  public static async getProfile(request: Request, response: Response) {
    try {
      // Prepare the data
      const currentUser = RequestUtils.getUser(request);
      let result: any = null;
      // Check if the changes applied
      if (
        !(result = await UsersSettingsServices.deepGetOneProfileByUserId(
          currentUser.id
        ))
      )
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Get Profile Failed",
              "Unable to get profile.",
              "An unexpected error occurred during the process.",
              "Please try again later.",
              null,
              null,
              null,
              null,
              request
            )
          );
      // Notify the user by email
      // NotificationsServices.pushNotification(
      //   {
      //     company: COMPANY_CONFIG,
      //     user: result.profile,
      //     emailPreference: result.emailPreference,
      //     notificationPreference: result.notificationPreference,
      //   },
      //   {
      //     from: COMPANY_CONFIG.SUPPORT_EMAIL as string,
      //     to: email,
      //     subject: "Forgot Password Request",
      //     html: AuthEmailTemplates.register,
      //   },
      //   null,
      //   null,
      //   RequestUtils.getRequestInfo(request),
      //   true,
      //   "accountActivity"
      // );
      // If everything is ok, send the response
      return response.status(200).send(
        ResponseUtils.generateSuccessMessage(
          200,
          "Get Profile Successfully",
          "Profile has been got successfully.",
          "Profile has been got successfully.",
          "",
          result,
          {
            ...result,
          },
          null,
          null,
          request
        )
      );
    } catch (error) {
      ConsoleUtils.error([
        "UsersSettingsControllers",
        "getProfile",
        "BEGIN ERROR",
      ]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn([
        "UsersSettingsControllers",
        "getProfile",
        "END ERROR",
      ]);
      return response
        .status(500)
        .send(
          ResponseUtils.generateErrorMessage(
            500,
            "Get Profile Failed",
            "Unable to get profile.",
            "An unexpected error occurred during the process.",
            "Please try again later.",
            null,
            null,
            error,
            null,
            request
          )
        );
    }
  }
}

export { UsersControllers, UsersSettingsControllers };
