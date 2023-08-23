import {
  DatabaseCore,
  FILE_UPLOAD_CONFIG,
  HashEncryptUtils,
  FileUploaderCore,
} from "../../../lib/internal.lib";

class UsersSettingsServices {
  public static async changeOneGeneralInformationByUserId(
    id: string,
    data: {
      firstName?: string;
      lastName?: string;
      country: string;
      city?: string;
      address?: string;
      email?: string;
      phoneNumber?: string;
      birthday?: Date;
      organization?: string;
      position?: string;
      department?: string;
      zipPostalCode?: string;
    }
  ): Promise<any> {
    return await DatabaseCore.instance?.user.update({
      where: {
        id: id,
      },
      data,
    });
  }

  public static async changeOneGeneralPreferenceByUserId(
    userId: string,
    data: {
      theme?: string;
      language?: string;
      timeZone?: string;
      fontSize?: number;
    }
  ): Promise<any> {
    return await DatabaseCore.instance?.generalPreference.update({
      where: {
        userId,
      },
      data: {
        theme: data.theme,
        language: data.language,
        timeZone: data.timeZone,
        fontSize: data.fontSize,
      },
    });
  }

  public static async changeOneEmailPreferenceByUserId(
    userId: string,
    data: {
      newsletter?: boolean;
      tickets?: boolean;
      messages?: boolean;
      virtualAssistant?: boolean;
      accountActivity?: boolean;
      usersActivity?: boolean;
    }
  ): Promise<any> {
    return await DatabaseCore.instance?.emailPreference.update({
      where: {
        userId,
      },
      data,
    });
  }

  public static async changeOneNotificationPreferenceByUserId(
    userId: string,
    data: {
      newsletter?: boolean;
      tickets?: boolean;
      messages?: boolean;
      virtualAssistant?: boolean;
      accountActivity?: boolean;
      usersActivity?: boolean;
    }
  ): Promise<any> {
    return await DatabaseCore.instance?.notificationPreference.update({
      where: {
        userId,
      },
      data,
    });
  }

  public static async revokeManySessionsByIdsAndByUserId(
    userId: string,
    sessionIds: string[]
  ): Promise<any> {
    return await DatabaseCore.instance?.session.updateMany({
      data: {
        revoked: true,
      },
      where: {
        userId,
        id: {
          in: sessionIds,
        },
      },
    });
  }

  public static async changeOnePasswordPasswordByUserId(
    id: string,
    password: string
  ): Promise<any> {
    const { salt, hashed } = HashEncryptUtils.hashPasswordRandomSalt(password);
    return await DatabaseCore.instance?.user.update({
      where: {
        id,
      },
      data: {
        password: hashed,
        salt,
      },
    });
  }

  public static async changeOneProfilePictureByUserId(
    id: string,
    file: any
  ): Promise<any> {
    return await FileUploaderCore.instance?.uploader.upload(file.path, {
      folder: FILE_UPLOAD_CONFIG.IMAGES.FOLDER,
    });
    // return await DatabaseCore.instance?.user.update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     profilePicture: upload.secure_url,
    //   },
    // });
  }

  public static async getOneProfileByUserId(id: string): Promise<any> {
    return await DatabaseCore.instance?.user.findFirst({
      where: {
        id,
      },
    });
  }

  public static async deepGetOneProfileByUserId(id: string): Promise<any> {
    return await DatabaseCore.instance?.user.findFirst({
      where: {
        id,
      },
      select: {
        password: false,
        salt: false,
        id: false,
        firstName: true,
        lastName: true,
        birthday: true,
        profilePicture: true,
        role: true,
        status: true,
        email: true,
        phoneNumber: true,
        country: true,
        city: true,
        address: true,
        zipPostalCode: true,
        organization: true,
        department: true,
        position: true,
        createdAt: true,
        updatedAt: true,
        tickets: false,
        sessions: true,
        forgetPassword: false,
        notificationPreference: true,
        emailPreference: true,
        generalPreference: true,
        files: false,
        _count: false,
      },
    });
  }
}

class UsersServices {
  public static async findOneByEmail(email: string): Promise<any> {
    return await DatabaseCore.instance?.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  public static async findOneByPhoneNumber(phoneNumber: string): Promise<any> {
    return await DatabaseCore.instance?.user.findFirst({
      where: {
        phoneNumber,
      },
    });
  }

  public static async findOneById(id: string): Promise<any> {
    return await DatabaseCore.instance?.user.findFirst({
      where: {
        id: id,
      },
    });
  }

  public static async deepFindOneById(id: string): Promise<{
    profile: any;
    tickets: any;
    generalPreference: any;
    emailPreference: any;
    notificationPreference: any;
    forgetPassword: any;
    sessions: any;
  }> {
    const user = await DatabaseCore.instance?.user.findFirst({
      where: {
        id: id,
      },
      include: {
        tickets: true,
        generalPreference: true,
        emailPreference: true,
        notificationPreference: true,
        sessions: true,
        forgetPassword: true,
        files: true,
      },
    });
    return {
      profile: user || null,
      tickets: user?.tickets || null,
      generalPreference: user?.generalPreference || null,
      emailPreference: user?.emailPreference || null,
      notificationPreference: user?.notificationPreference || null,
      forgetPassword: user?.forgetPassword || null,
      sessions: user?.sessions || null,
    };
  }
  public static async deepFindOneByEmail(email: string): Promise<{
    profile: any;
    tickets: any;
    generalPreference: any;
    emailPreference: any;
    notificationPreference: any;
    forgetPassword: any;
    sessions: any;
  }> {
    const user = await DatabaseCore.instance?.user.findFirst({
      where: {
        email: email,
      },
      include: {
        tickets: true,
        generalPreference: true,
        emailPreference: true,
        notificationPreference: true,
        sessions: true,
        forgetPassword: true,
        files: true,
      },
    });
    return {
      profile: user || null,
      tickets: user?.tickets || null,
      generalPreference: user?.generalPreference || null,
      emailPreference: user?.emailPreference || null,
      notificationPreference: user?.notificationPreference || null,
      forgetPassword: user?.forgetPassword || null,
      sessions: user?.sessions || null,
    };
  }
  public static async deleteOneById(id: string): Promise<any> {
    return await DatabaseCore.instance?.user.delete({
      where: {
        id: id,
      },
    });
  }

  public static async deleteOneByEmail(email: string): Promise<any> {
    return await DatabaseCore.instance?.user.delete({
      where: {
        email: email,
      },
    });
  }

  public static async deepDeleteOneById(id: string): Promise<{
    profile: any;
    files: any;
    generalPreference: any;
    emailPreference: any;
    notificationPreference: any;
    tickets: any;
    sessions: any;
    forgetPassword: any;
  }> {
    const files = await DatabaseCore.instance?.file.deleteMany({
      where: {
        userId: id,
      },
    });
    const generalPreference =
      await DatabaseCore.instance?.generalPreference.deleteMany({
        where: {
          userId: id,
        },
      });
    const emailPreference =
      await DatabaseCore.instance?.emailPreference.deleteMany({
        where: {
          userId: id,
        },
      });
    const notificationPreference =
      await DatabaseCore.instance?.notificationPreference.deleteMany({
        where: {
          userId: id,
        },
      });
    const tickets = await DatabaseCore.instance?.ticket.deleteMany({
      where: {
        userId: id,
      },
    });
    const sessions = await DatabaseCore.instance?.session.deleteMany({
      where: {
        userId: id,
      },
    });
    const forgetPassword =
      await DatabaseCore.instance?.forgetPassword.deleteMany({
        where: {
          userId: id,
        },
      });
    const user = await DatabaseCore.instance?.user.deleteMany({
      where: {
        id: id,
      },
    });
    return {
      files,
      generalPreference,
      emailPreference,
      notificationPreference,
      tickets,
      sessions,
      forgetPassword,
      profile: user,
    };
  }

  public static async deepDeleteOneByEmail(email: string): Promise<{
    profile: any;
    files: any;
    generalPreference: any;
    emailPreference: any;
    notificationPreference: any;
    tickets: any;
    sessions: any;
    forgetPassword: any;
  }> {
    const { id } = (await DatabaseCore.instance?.user.findFirst({
      where: {
        email: email,
      },
    })) || { id: "" };
    const files = await DatabaseCore.instance?.file.deleteMany({
      where: {
        userId: id,
      },
    });
    const generalPreference =
      await DatabaseCore.instance?.generalPreference.deleteMany({
        where: {
          userId: id,
        },
      });
    const emailPreference =
      await DatabaseCore.instance?.emailPreference.deleteMany({
        where: {
          userId: id,
        },
      });
    const notificationPreference =
      await DatabaseCore.instance?.notificationPreference.deleteMany({
        where: {
          userId: id,
        },
      });
    const tickets = await DatabaseCore.instance?.ticket.deleteMany({
      where: {
        userId: id,
      },
    });
    const sessions = await DatabaseCore.instance?.session.deleteMany({
      where: {
        userId: id,
      },
    });
    const forgetPassword =
      await DatabaseCore.instance?.forgetPassword.deleteMany({
        where: {
          userId: id,
        },
      });
    const user = await DatabaseCore.instance?.user.deleteMany({
      where: {
        id: id,
      },
    });
    return {
      files,
      generalPreference,
      emailPreference,
      notificationPreference,
      tickets,
      sessions,
      forgetPassword,
      profile: user,
    };
  }
}

export { UsersServices, UsersSettingsServices };
