import {
  Ticket,
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from "@prisma/client";
import { DatabaseCore } from "../../../lib/internal.lib";

class TicketsServices {
  public static async createOne(
    data: {
      title: string;
      description: string;
      priority: TicketPriority;
      category: TicketCategory;
      tags: string;
      userId: string;
    },
    files: {
      documents: string[];
      images: string[];
      videos: string[];
      audios: string[];
    }
  ): Promise<any> {
    const ticket = await DatabaseCore.instance?.ticket.create({
      data,
    });
    for (const video of files.videos) {
      await DatabaseCore.instance?.file.create({
        data: {
          ticketId: ticket?.id,
          type: "VIDEO",
          url: video,
        },
      });
    }
    return ticket;
  }
  public static async findOneById(id: string): Promise<any> {
    return await DatabaseCore.instance?.ticket.findMany({
      where: {
        id,
      },
      include: {
        _count: true,
      },
    });
  }
  public static async deepFindOneById(id: string): Promise<any> {
    return await DatabaseCore.instance?.ticket.findFirst({
      where: {
        id,
      },
      include: {
        user: true,
        files: true,
      },
    });
  }
  public static async findManyByUserId(
    filter: {
      title: string;
      status: TicketStatus[];
      priority: TicketPriority[];
      category: TicketCategory[];
      startCreatedDate: Date;
      endCreatedDate: Date;
      startUpdatedDate: Date;
      endUpdatedDate: Date;
      tags: string[];
      userId: string;
    },
    settings: {
      limit: number;
      sortBy: "title" | "status" | "priority" | "category";
      start: number;
      order: "asc";
    }
  ): Promise<any> {
    return DatabaseCore.instance?.ticket.findMany({
      where: {
        title: {
          contains: filter.title,
        },
        status: {
          in: filter.status,
        },
        priority: {
          in: filter.priority,
        },
        category: {
          in: filter.category,
        },
        createdAt: {
          gte: filter.startCreatedDate,
          lte: filter.endCreatedDate,
        },
        updatedAt: {
          gte: filter.startUpdatedDate,
          lte: filter.endUpdatedDate,
        },
        tags: {
          in: filter.tags,
        },
        userId: filter.userId,
      },
      include: {
        user: true,
        _count: true,
      },
      skip: settings.start - 1,
      take: settings.limit,
      orderBy: {
        [settings.sortBy]: settings.order,
      },
    });
  }
}

export { TicketsServices };
