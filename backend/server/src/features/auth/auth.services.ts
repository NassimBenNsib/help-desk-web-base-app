import {
  DatabaseCore,
  FORGOT_PASSWORD_CONFIG,
  HashEncryptUtils,
  SessionsServices,
} from "../../../lib/internal.lib";

class AuthServices {
  public static async register(
    email: string,
    password: string
  ): Promise<{
    profile: any;
    generalPreference: any;
    emailPreference: any;
    notificationPreference: any;
  } | null> {
    const { salt, hashed } = HashEncryptUtils.hashPasswordRandomSalt(password);
    let user = null;
    if (
      !(user = await DatabaseCore.instance?.user.create({
        data: {
          email,
          password: hashed,
          salt,
        },
      }))
    )
      return null;
    const generalPreference =
      await DatabaseCore.instance?.generalPreference.create({
        data: {
          userId: user.id,
        },
      });
    const emailPreference = await DatabaseCore.instance?.emailPreference.create(
      {
        data: {
          userId: user.id,
        },
      }
    );
    const notificationPreference =
      await DatabaseCore.instance?.notificationPreference.create({
        data: {
          userId: user.id,
        },
      });

    return {
      profile: user,
      generalPreference,
      emailPreference,
      notificationPreference,
    };
  }
  public static async login(
    userId: string,
    requestInfo: {
      ip: string;
      geo: {
        city: string;
        country: string;
        region: string;
        timezone: string;
      };
      useragent: {
        device: string;
        platform: string;
        os: string;
        browser: string;
        version: string;
      };
    }
  ): Promise<{
    token: string;
    session: any;
    encrypted_session: string;
  } | null> {
    const session = await SessionsServices.createOne({
      ...requestInfo.geo,
      ...requestInfo.useragent,
      ip: requestInfo.ip,
      userId: userId,
    });
    if (!session) return null;
    const encrypted_session = HashEncryptUtils.encryptSession(session);
    if (!encrypted_session) return null;
    const token = HashEncryptUtils.generateToken(encrypted_session);
    if (!token) return null;
    return { token, session, encrypted_session };
  }
  public static async logout(session_id: string): Promise<any> {
    return await SessionsServices.deleteOneById(session_id);
  }
  public static async forgotPassword(userId: string): Promise<any> {
    let exitsForgotPassword =
      await DatabaseCore.instance?.forgetPassword.findFirst({
        where: {
          userId,
        },
        include: {
          user: true,
        },
      });

    if (
      exitsForgotPassword &&
      new Date(exitsForgotPassword?.updatedAt).getTime() +
        parseInt(exitsForgotPassword?.expiresDuration) -
        1000 * 60 * 3 < // 3 minutes
        Date.now()
    )
      await DatabaseCore.instance?.forgetPassword.delete({
        where: {
          id: exitsForgotPassword.id,
        },
      });
    else if (exitsForgotPassword) return exitsForgotPassword;
    return await DatabaseCore.instance?.forgetPassword.create({
      data: {
        userId,
        expiresDuration: FORGOT_PASSWORD_CONFIG.EXPIRES_IN.toString(),
      },
      include: {
        user: true,
      },
    });
  }
  public static async resetPassword(
    userId: string,
    forgetPasswordId: string,
    newPassword: string
  ): Promise<any> {
    const { salt, hashed } =
      HashEncryptUtils.hashPasswordRandomSalt(newPassword);
    const user = await DatabaseCore.instance?.user.update({
      where: {
        id: userId,
      },
      include: {
        forgetPassword: true,
      },
      data: {
        password: hashed,
        salt,
        forgetPassword: {
          delete: [
            {
              id: forgetPasswordId,
            },
          ],
        },
      },
    });
    if (!user) return null;

    return {
      user,
    };
  }

  public static async verifyResetCode(
    userId: string,
    code: string
  ): Promise<"EXPIRED" | "NOT_FOUND" | any> {
    const exitsForgotPassword =
      await DatabaseCore.instance?.forgetPassword.findFirst({
        where: {
          OR: [
            {
              code,
            },
            {
              userId,
            },
          ],
        },
        include: {
          user: true,
        },
      });
    if (!exitsForgotPassword) return "NOT_FOUND";
    if (exitsForgotPassword.userId !== userId) return "NOT_FOUND";
    if (
      exitsForgotPassword &&
      new Date(exitsForgotPassword?.updatedAt).getTime() +
        parseInt(exitsForgotPassword?.expiresDuration) <
        Date.now()
    )
      return "EXPIRED";
    if (exitsForgotPassword.code !== code) return "INVALID";
    return exitsForgotPassword;
  }
}

export { AuthServices };
