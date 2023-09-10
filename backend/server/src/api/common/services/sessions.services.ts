import { DatabaseCore, SESSIONS_CONFIG } from "../../../../lib/internal.lib";

class SessionsServices {
  public static async createOne(data: {
    ip: string;
    city: string;
    country: string;
    region: string;
    timezone: string;
    device: string;
    platform: string;
    os: string;
    browser: string;
    version: string;
    userId: string;
  }): Promise<any> {
    console.table(data);
    return await DatabaseCore.instance?.session?.create({
      data: {
        ...data,
        expiresDuration: SESSIONS_CONFIG.EXPIRES_IN.toString(),
      },
    });
  }

  public static async findOneById(id: string): Promise<any> {
    return await DatabaseCore.instance?.session?.findFirst({
      where: { id },
    });
  }

  public static async findManyByIds(sessionsIds: string[]): Promise<any> {
    return await DatabaseCore.instance?.session?.findMany({
      where: {
        id: {
          in: sessionsIds,
        },
      },
    });
  }

  public static async deepFindOneById(id: string): Promise<any> {
    return await DatabaseCore.instance?.session?.findFirst({
      where: { id },
      include: {
        user: {
          include: {
            generalPreference: true,
            emailPreference: true,
            notificationPreference: true,
          },
        },
      },
    });
  }

  public static async findMany(
    filter: {
      id?: string;
      ip?: string;
      city?: string;
      country?: string;
      region?: string;
      timezone?: string;
      device?: string;
      platform?: string;
      os?: string;
      browser?: string;
      version?: string;
      userId?: string;
      revoked?: Boolean;
      createdAt?: Date;
      updatedAt?: Date;
    },
    settings: {
      limit: number;
      start: number;
      orderBy: {
        id?: "asc" | "desc";
        ip?: "asc" | "desc";
        city?: "asc" | "desc";
        country?: "asc" | "desc";
        region?: "asc" | "desc";
        timezone?: "asc" | "desc";
        device?: "asc" | "desc";
        platform?: "asc" | "desc";
        os?: "asc" | "desc";
        browser?: "asc" | "desc";
        version?: "asc" | "desc";
        userId?: "asc" | "desc";
        revoked?: "asc" | "desc";
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
      };
    }
  ) {
    return await DatabaseCore.instance?.session?.findMany({
      where: filter,
      skip: settings.start - 1,
      take: settings.limit,
      orderBy: settings.orderBy,
    });
  }

  public static async updateOneIpAddressById(
    id: string,
    ip: string
  ): Promise<any> {
    return await DatabaseCore.instance?.session?.update({
      where: { id },
      data: { ip },
    });
  }

  public static async updateMany(
    data: {
      id?: string;
      ip?: string;
      city?: string;
      country?: string;
      region?: string;
      timezone?: string;
      device?: string;
      platform?: string;
      os?: string;
      browser?: string;
      version?: string;
      userId?: string;
      revoked?: Boolean;
    },
    filter: {
      id?: string;
      ip?: string;
      city?: string;
      country?: string;
      region?: string;
      timezone?: string;
      device?: string;
      platform?: string;
      os?: string;
      browser?: string;
      version?: string;
      userId?: string;
      revoked?: Boolean;
      createdAt?: Date;
      updatedAt?: Date;
    }
  ) {
    return await DatabaseCore.instance?.session?.updateMany({
      data,
      where: filter,
    });
  }

  public static async revokeOneById(id: string): Promise<any> {
    return await DatabaseCore.instance?.session.update({
      where: { id },
      data: { revoked: true },
    });
  }

  public static async revokeAllByUserId(userId: string): Promise<any> {
    return await DatabaseCore.instance?.session.updateMany({
      where: { userId },
      data: { revoked: true },
    });
  }

  public static async deleteOneById(id: string): Promise<any> {
    return await DatabaseCore.instance?.session?.delete({
      where: { id },
    });
  }

  public static async deleteMany(filter: {
    id?: string;
    ip?: string;
    city?: string;
    country?: string;
    region?: string;
    timezone?: string;
    device?: string;
    platform?: string;
    os?: string;
    browser?: string;
    version?: string;
    userId?: string;
    revoked?: Boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return await DatabaseCore.instance?.session?.deleteMany({
      where: filter,
    });
  }
}

export { SessionsServices };
