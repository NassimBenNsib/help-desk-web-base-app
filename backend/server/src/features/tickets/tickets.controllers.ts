import { TicketCategory, TicketPriority, TicketStatus } from "@prisma/client";
import { Response, Request } from "../../../lib/external.lib";
import {
  ConsoleUtils,
  DatabaseCore,
  RequestUtils,
  ResponseUtils,
  TicketsServices,
  UsersRoleEnum,
} from "../../../lib/internal.lib";

class TicketsControllers {
  public static async createTicket(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      // Prepare the data
      const {
        title,
        description,
        priority,
        category,
        tags,
        documents,
        images,
        videos,
        audios,
      } = request.body;
      const currentUser = RequestUtils.getUser(request);
      let result: any = null;
      // Check if the changes applied
      if (
        !(result = await TicketsServices.createOne(
          {
            userId: currentUser.id,
            title,
            description,
            priority,
            category,
            tags: tags.join(","),
          },
          {
            videos,
            audios,
            images,
            documents,
          }
        ))
      )
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Create Ticket Failed",
              "Unable to create the ticket.",
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
          "Create Ticket Succeeded",
          "Ticket has been created successfully.",
          "Ticket has been created successfully.",
          "Please wait one of our agents handle your ticket.",
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
      ConsoleUtils.error(["TicketsControllers", "createTicket", "BEGIN ERROR"]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn(["TicketsControllers", "createTicket", "END ERROR"]);
      return response
        .status(500)
        .send(
          ResponseUtils.generateErrorMessage(
            500,
            "Create Ticket Failed",
            "Unable to create the ticket.",
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

  public static async getTicketDetails(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      // Prepare the data
      const { id } = request.params;
      const currentUser = RequestUtils.getUser(request);
      let result: any = null;
      if (currentUser.role === UsersRoleEnum.USER)
        result = await TicketsServices.findOneById(id);
      else result = await TicketsServices.deepFindOneById(id);
      console.log(result);
      if (!result)
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Get Ticket Details Failed",
              "Unable to get the ticket details.",
              "An unexpected error occurred during the process.",
              "Please try again later.",
              null,
              null,
              null,
              null,
              request
            )
          );
      // If the user is not an admin, check if the ticket belongs to him
      if (
        currentUser.role === UsersRoleEnum.USER &&
        result.userId !== currentUser.id
      )
        return response
          .status(400)
          .send(
            ResponseUtils.generateErrorMessage(
              400,
              "Get Ticket Details Failed",
              "You are not allowed to get this ticket details.",
              "You are not allowed to get this ticket details.",
              "This ticket does not belong to you.",
              "",
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
          "Get Ticket Details Succeeded",
          "Ticket details has been retrieved successfully.",
          "Ticket details has been retrieved successfully.",
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
        "TicketsControllers",
        "getTicketDetails",
        "BEGIN ERROR",
      ]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn([
        "TicketsControllers",
        "getTicketDetails",
        "END ERROR",
      ]);
      return response
        .status(500)
        .send(
          ResponseUtils.generateErrorMessage(
            500,
            "Get Ticket Details Failed",
            "Unable to get the ticket details.",
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

  // public static async getTickets(
  //   request: Request,
  //   response: Response
  // ): Promise<Response> {
  //   try {
  //     // Prepare the data
  //     const {
  //       title,
  //       status,
  //       priority,
  //       category,
  //       startCreatedDate,
  //       endCreatedDate,
  //       startUpdatedDate,
  //       endUpdatedDate,
  //       tags,
  //       userId,
  //       limit,
  //       start,
  //       order,
  //       sortBy,
  //     } = request.params;
  //     const currentUser = RequestUtils.getUser(request);
  //     let result: any = null;
  //     if (currentUser.role === UsersRoleEnum.USER)
  //       result = await TicketsServices.findManyByUserId(
  //         {
  //           title,
  //           status: [
  //             TicketStatus.CLOSED,
  //             TicketStatus.OPENED,
  //             TicketStatus.PENDDING,
  //             TicketStatus.SOLVED,
  //             TicketStatus.UNTACHED,
  //           ],
  //           priority: [
  //             TicketPriority.HIGH,
  //             TicketPriority.LOW,
  //             TicketPriority.NORMAL,
  //             TicketPriority.URGENT,
  //           ],
  //           category: [
  //             TicketCategory.ACCOUNT_INQUIRY,
  //             TicketCategory.BUG_REPORT,
  //             TicketCategory.FEEBACK_AND_SUGGESTION,
  //             TicketCategory.GENERAL_INQUIRY,
  //             TicketCategory.NEW_FEATURE_REQUEST,
  //             TicketCategory.NEW_PROJECT_REQUEST,
  //             TicketCategory.TECHNICAL_ISSUE,
  //             TicketCategory.TRAINING_REQUEST,
  //           ],
  //           startCreatedDate : new Date(

  //           ),
  //           endCreatedDate,
  //           startUpdatedDate,
  //           endUpdatedDate,
  //           tags,
  //           userId,
  //         },
  //         {
  //           limit,
  //           start,
  //           order,
  //           sortBy,
  //         }
  //       );
  //     // else
  //     //   result = await TicketsServices.findManyByUserId({
  //     //     title,
  //     //     status,
  //     //     priority,
  //     //     category,
  //     //     startCreatedDate,
  //     //     endCreatedDate,
  //     //     startUpdatedDate,
  //     //     endUpdatedDate,
  //     //     tags,
  //     //     userId,
  //     //   });
  //     if (!result)
  //       return response
  //         .status(400)
  //         .send(
  //           ResponseUtils.generateErrorMessage(
  //             400,
  //             "Get Tickets Failed",
  //             "Unable to get the tickets.",
  //             "An unexpected error occurred during the process.",
  //             "Please try again later.",
  //             null,
  //             null,
  //             null,
  //             null,
  //             request
  //           )
  //         );

  //     // Notify the user by email
  //     // NotificationsServices.pushNotification(
  //     //   {
  //     //     company: COMPANY_CONFIG,
  //     //     user: result.profile,
  //     //     emailPreference: result.emailPreference,
  //     //     notificationPreference: result.notificationPreference,
  //     //   },
  //     //   {
  //     //     from: COMPANY_CONFIG.SUPPORT_EMAIL as string,
  //     //     to: email,
  //     //     subject: "Forgot Password Request",
  //     //     html: AuthEmailTemplates.register,
  //     //   },
  //     //   null,
  //     //   null,
  //     //   RequestUtils.getRequestInfo(request),
  //     //   true,
  //     //   "accountActivity"
  //     // );
  //     // If everything is ok, send the response
  //     return response.status(200).send(
  //       ResponseUtils.generateSuccessMessage(
  //         200,
  //         "Get Tickets Succeeded",
  //         "Tickets has been retrieved successfully.",
  //         "Tickets has been retrieved successfully.",
  //         "",
  //         result,
  //         {
  //           ...result,
  //         },
  //         null,
  //         null,
  //         request
  //       )
  //     );
  //   } catch (error) {
  //     ConsoleUtils.error(["TicketsControllers", "createTicket", "BEGIN ERROR"]);
  //     console.table(error);
  //     console.log(error);
  //     ConsoleUtils.warn(["TicketsControllers", "createTicket", "END ERROR"]);
  //     return response
  //       .status(500)
  //       .send(
  //         ResponseUtils.generateErrorMessage(
  //           500,
  //           "Get Tickets Failed",
  //           "Unable to get the tickets.",
  //           "An unexpected error occurred during the process.",
  //           "Please try again later.",
  //           null,
  //           null,
  //           error,
  //           null,
  //           request
  //         )
  //       );
  //   }
  // }
}

export { TicketsControllers };
