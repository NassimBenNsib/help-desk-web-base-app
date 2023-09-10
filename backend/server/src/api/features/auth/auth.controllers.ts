import { Response, Request } from "../../../lib/external.lib";
import {
  UsersServices,
  HashEncryptUtils,
  UsersStatusEnum,
  RequestUtils,
  ResponseUtils,
  ConsoleUtils,
  COMPANY_CONFIG,
  NormalizerSerializerUtils,
  NotificationsServices,
  MailerServices,
} from "../../../lib/internal.lib";
import { AuthEmailTemplates, AuthServices } from ".";
import { emailRegister } from "./templates/auth.templates.register";

class AuthControllers {
  public static async register(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      // Prepare the data
      const { email, password } = request.body;
      const emailNormalized = NormalizerSerializerUtils.normalizeEmail(email);
      // Verify if the email already taken
      const user = await UsersServices.findOneByEmail(emailNormalized);
      if (user)
        return response
          .status(409)
          .json(
            ResponseUtils.generateErrorMessage(
              409,
              "Registration Failed",
              "This email address is already registered.",
              `The email address ${email} is already registered in our system. Please check the database for duplicate entries.`,
              "Please try again with a different email address.",
              null,
              { emailNormalized, user },
              null,
              null,
              request
            )
          );
      // Register the new user
      let result = null;
      if (
        !(result = await AuthServices.register(emailNormalized, password)) ||
        !result.profile ||
        !result.notificationPreference ||
        !result.emailPreference ||
        !result.generalPreference
      )
        return response
          .status(500)
          .send(
            ResponseUtils.generateErrorMessage(
              500,
              "Registration Failed",
              "Unable to register the user.",
              "An unexpected error occurred during registration.",
              "Please try again later.",
              null,
              { emailNormalized, result },
              null,
              null,
              request
            )
          );
      // Notify the user by email
      // NotificationsServices.pushNotification(
      //   {
      //     company: COMPANY_CONFIG,
      //     profile: result.profile,
      //     emailPreference: result.emailPreference,
      //     notificationPreference: result.notificationPreference,
      //   },
      //   {
      //     from: COMPANY_CONFIG.SUPPORT_EMAIL as string,
      //     to: email,
      //     subject: "Account Registration Successful",
      //     html: () => {
      //       return emailRegister(email);
      //     },
      //   },
      //   null,
      //   null,
      //   RequestUtils.getRequestInfo(request),
      //   true,
      //   "accountActivity"
      // );

      MailerServices.sendHTMLMail({
        from: COMPANY_CONFIG.SUPPORT_EMAIL as string,
        to: email,
        subject: "Account Registration Successful",
        html: AuthEmailTemplates.register(email),
      });
      // Return a success response if everything is fine
      return response
        .status(201)
        .send(
          ResponseUtils.generateSuccessMessage(
            201,
            "Registration Successful",
            "Account created successfully.",
            "Congratulations, your account has been created successfully.",
            "Please wait for admin approval to access your account.",
            null,
            { ...result },
            null,
            null,
            request
          )
        );
    } catch (error: any) {
      // Handle any unexpected errors
      ConsoleUtils.error(["AuthControllers", "register", "BEGIN ERROR"]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn(["AuthControllers", "register", "END ERROR"]);
      return response
        .status(500)
        .send(
          ResponseUtils.generateErrorMessage(
            500,
            "Registration Failed",
            "Unable to register the user.",
            "An unexpected error occurred during registration.",
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

  public static async login(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      // Prepare the data
      const { email, password } = request.body;
      const emailNormalized = NormalizerSerializerUtils.normalizeEmail(email);
      // Verify if the email exist
      let user = await UsersServices.findOneByEmail(emailNormalized);
      if (!user)
        return response
          .status(404)
          .json(
            ResponseUtils.generateErrorMessage(
              404,
              "Authentication Failed",
              "This email address is not registered.",
              `The email '${emailNormalized}' does not exist in the user database. Please verify the email address provided during authentication.`,
              "Please try again with a different email address.",
              null,
              { emailNormalized },
              null,
              null,
              request
            )
          );
      // Verify the status of the user
      if (user.status === UsersStatusEnum.UNVERIFIED) {
        return response
          .status(401)
          .json(
            ResponseUtils.generateErrorMessage(
              401,
              "Authentication Failed",
              "Account not verified",
              "This account has not been verified yet.",
              "Please wait for admin approval to access your account.",
              null,
              { user },
              null,
              null,
              request
            )
          );
      } else if (user.status === UsersStatusEnum.BANNED) {
        return response
          .status(401)
          .json(
            ResponseUtils.generateErrorMessage(
              401,
              "Authentication Failed",
              "Account banned",
              "This account has been banned by the administrator.",
              "Please contact the administrator for more information.",
              null,
              { user },
              null,
              null,
              request
            )
          );
      }
      // Verify if the password is correct
      if (
        !HashEncryptUtils.comparePasswordWithHashed(
          password,
          user.salt,
          user.password
        )
      ) {
        return response
          .status(401)
          .json(
            ResponseUtils.generateErrorMessage(
              401,
              "Authentication Failed",
              "Incorrect password",
              "The password provided is incorrect.",
              "Please try again with a different password.",
              null,
              { user },
              null,
              null,
              request
            )
          );
      }
      // Login & Create Token
      let result = null;
      if (
        !(result = await AuthServices.login(
          user.id,
          RequestUtils.getRequestInfo(request)
        ))
      )
        return response
          .status(500)
          .send(
            ResponseUtils.generateErrorMessage(
              500,
              "Authentication Failed",
              "Unable to authenticate the user.",
              "An unexpected error occurred during authentication.",
              "Please try again later.",
              null,
              { ...(result || {}), user },
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
      //     subject: "New Login Detected",
      //     html: AuthEmailTemplates.register,
      //   },
      //   null,
      //   null,
      //   RequestUtils.getRequestInfo(request),
      //   true,
      //   "accountActivity"
      // );

      return response
        .status(200)
        .send(
          ResponseUtils.generateSuccessMessage(
            200,
            "Authentication Successful",
            "Login successful.",
            "",
            "Welcome back",
            result.token,
            { ...result },
            null,
            null,
            request
          )
        );
    } catch (error) {
      // Handle any unexpected errors
      ConsoleUtils.error(["AuthControllers", "login", "BEGIN ERROR"]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn(["AuthControllers", "login", "END ERROR"]);
      return response
        .status(500)
        .send(
          ResponseUtils.generateErrorMessage(
            500,
            "Authentication Failed",
            "Unable to authenticate the user.",
            "An unexpected error occurred during authentication.",
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

  public static async logout(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const sessionId = (request.user as any)?.id;
      const session = await AuthServices.logout(sessionId);
      if (!session)
        return response
          .status(500)
          .send(
            ResponseUtils.generateErrorMessage(
              500,
              "Logout Failed",
              "Unable to logout the user.",
              "An unexpected error occurred during logout.",
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
      //     subject: "Logout Detected",
      //     html: AuthEmailTemplates.register,
      //   },
      //   null,
      //   null,
      //   RequestUtils.getRequestInfo(request),
      //   true,
      //   "accountActivity"
      // );

      return response.status(200).send(
        ResponseUtils.generateSuccessMessage(
          200,
          "Logout Successful",
          "Logout successful.",
          "You have been logged out successfully.",
          "",
          null,
          {
            session,
            user: (request.user as any)?.user,
          },
          null,
          null,
          request
        )
      );
    } catch (error) {
      ConsoleUtils.error(["AuthControllers", "logout", "BEGIN ERROR"]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn(["AuthControllers", "logout", "END ERROR"]);
      return response
        .status(500)
        .send(
          ResponseUtils.generateErrorMessage(
            500,
            "Logout Failed",
            "Unable to logout the user.",
            "An unexpected error occurred during logout.",
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

  public static async forgotPassword(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      // Prepare the data
      const { email } = request.body;
      const emailNormalized = NormalizerSerializerUtils.normalizeEmail(email);
      // Verify if the email exist
      let user = await UsersServices.findOneByEmail(emailNormalized);
      if (!user)
        return response
          .status(404)
          .json(
            ResponseUtils.generateErrorMessage(
              404,
              "Forgot Password Failed",
              "This email address is not registered.",
              `The email '${emailNormalized}' does not exist in the user database.`,
              "Please try again with a different email address.",
              null,
              { emailNormalized },
              null,
              null,
              request
            )
          );
      // Verify the status of the user
      if (user.status === UsersStatusEnum.UNVERIFIED) {
        return response
          .status(401)
          .json(
            ResponseUtils.generateErrorMessage(
              401,
              "Forgot Password Failed",
              "Account not verified",
              "This account has not been verified yet.",
              "Please wait for admin approval to access your account.",
              null,
              { user },
              null,
              null,
              request
            )
          );
      } else if (user.status === UsersStatusEnum.BANNED) {
        return response
          .status(401)
          .json(
            ResponseUtils.generateErrorMessage(
              401,
              "Forgot Password Failed",
              "Account banned",
              "This account has been banned by the administrator.",
              "Please contact the administrator for more information.",
              null,
              { user },
              null,
              null,
              request
            )
          );
      }
      const forgetPassword = await AuthServices.forgotPassword(user.id);

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

      return response.status(200).send(
        ResponseUtils.generateSuccessMessage(
          200,
          "Forgot Password Successful",
          "A code has been sent.",
          "Forgot password request successful. An email has been sent to your email address.",
          "Please check your email for the code to reset your password.",
          null,
          {
            forgetPassword,
          },
          null,
          null,
          request
        )
      );
    } catch (error) {
      ConsoleUtils.error(["AuthControllers", "logout", "BEGIN ERROR"]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn(["AuthControllers", "logout", "END ERROR"]);
      return response
        .status(500)
        .send(
          ResponseUtils.generateErrorMessage(
            500,
            "Forgot Password Failed",
            "Unable to process forgot password request.",
            "An unexpected error occurred during forgot password process.",
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

  public static async resetPassword(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      // Prepare the data
      const { email, newPassword, code } = request.body;
      const emailNormalized = NormalizerSerializerUtils.normalizeEmail(email);
      // Verify if the email exist
      let user = await UsersServices.findOneByEmail(emailNormalized);
      if (!user)
        return response
          .status(404)
          .json(
            ResponseUtils.generateErrorMessage(
              404,
              "Reset Password Failed",
              "This email address is not found",
              `The email '${emailNormalized}' does not exist in the user database.`,
              "It's possible that the email was changed or deleted by the administrator.",
              null,
              { emailNormalized },
              null,
              null,
              request
            )
          );
      // Verify the status of the user
      if (user.status === UsersStatusEnum.UNVERIFIED) {
        return response
          .status(401)
          .json(
            ResponseUtils.generateErrorMessage(
              401,
              "Reset Password Failed",
              "Account not verified",
              "This account has not been verified yet.",
              "Please wait for admin approval to access your account.",
              null,
              { user },
              null,
              null,
              request
            )
          );
      } else if (user.status === UsersStatusEnum.BANNED) {
        return response
          .status(401)
          .json(
            ResponseUtils.generateErrorMessage(
              401,
              "Reset Password Failed",
              "Account banned",
              "This account has been banned by the administrator.",
              "Please contact the administrator for more information.",
              null,
              { user },
              null,
              null,
              request
            )
          );
      }
      // Verify if the password is different than the old one
      if (
        HashEncryptUtils.comparePasswordWithHashed(
          newPassword,
          user.salt,
          user.password
        )
      )
        return response
          .status(401)
          .json(
            ResponseUtils.generateErrorMessage(
              401,
              "Reset Password Failed",
              "New password must be different than the old one",
              "New password must be different than the old one",
              "",
              null,
              { user },
              null,
              null,
              request
            )
          );
      // Verify the code
      const verifyCode = await AuthServices.verifyResetCode(user.id, code);
      if (verifyCode === "NOT_FOUND")
        return response
          .status(404)
          .json(
            ResponseUtils.generateErrorMessage(
              404,
              "Reset Password Failed",
              "Invalid reset code",
              "The code is not found in the database.",
              "Please try again with a different code.",
              null,
              { user },
              null,
              null,
              request
            )
          );
      else if (verifyCode === "EXPIRED")
        return response
          .status(401)
          .json(
            ResponseUtils.generateErrorMessage(
              401,
              "Reset Password Failed",
              "Reset code expired",
              "The code has expired.",
              "Please try again with a different code.",
              null,
              { user },
              null,
              null,
              request
            )
          );
      else if (verifyCode.user.email !== emailNormalized) {
        return response
          .status(401)
          .json(
            ResponseUtils.generateErrorMessage(
              401,
              "Reset Password Failed",
              "Email not match",
              "This email does not match the email in the database.",
              "Please try again with a different email address.",
              null,
              { user },
              null,
              null,
              request
            )
          );
      }
      const resetPassword = await AuthServices.resetPassword(
        user.id,
        verifyCode?.id,
        newPassword
      );
      if (!resetPassword)
        return response
          .status(500)
          .json(
            ResponseUtils.generateErrorMessage(
              500,
              "Reset Password Failed",
              "Unable to process reset password request.",
              "An unexpected error occurred during reset password process.",
              "Please try again later.",
              null,
              { user },
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

      return response.status(200).send(
        ResponseUtils.generateSuccessMessage(
          200,
          "Reset Password Successful",
          "Password reset successful.",
          "Password reset request successful.",
          "Go back to the login page to login with your new password.",
          null,
          {
            ...resetPassword,
          },
          null,
          null,
          request
        )
      );
    } catch (error) {
      ConsoleUtils.error(["AuthControllers", "logout", "BEGIN ERROR"]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn(["AuthControllers", "logout", "END ERROR"]);
      return response
        .status(500)
        .send(
          ResponseUtils.generateErrorMessage(
            500,
            "Reset Password Failed",
            "Unable to process reset password request.",
            "An unexpected error occurred during reset password process.",
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

export { AuthControllers };
