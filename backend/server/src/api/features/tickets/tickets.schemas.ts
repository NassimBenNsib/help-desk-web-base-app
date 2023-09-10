import { z } from "../../../lib/external.lib";
import { SchemaValidationUtils } from "../../../lib/internal.lib";

class TicketsSchemasValidations {
  public static createTicket = z.object({
    body: z.object({
      title: SchemaValidationUtils.ticketTitle,
      description: SchemaValidationUtils.ticketDescription,
      priority: SchemaValidationUtils.ticketPriority,
      category: SchemaValidationUtils.ticketCategory,
      tags: SchemaValidationUtils.ticketTags,
      images: SchemaValidationUtils.images,
      audios: SchemaValidationUtils.audios,
      videos: SchemaValidationUtils.videos,
      documents: SchemaValidationUtils.documents,
    }),
  });
  public static getTicketDetails = z.object({
    params: z.object({
      id: SchemaValidationUtils.ticketId,
    }),
  });
  public static getTickets = z.object({
    query: z.object({
      title: SchemaValidationUtils.ticketTitle,
      description: SchemaValidationUtils.ticketDescription,
      priority: SchemaValidationUtils.ticketPriority,
      start: SchemaValidationUtils.start,
      limit: SchemaValidationUtils.limit,
      category: SchemaValidationUtils.ticketCategory,
      // tags: SchemaValidationUtils.ticketTags,
    }),
  });
}

export { TicketsSchemasValidations };
