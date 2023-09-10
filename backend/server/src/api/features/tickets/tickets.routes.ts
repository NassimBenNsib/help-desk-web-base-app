import { Router } from "../../../lib/external.lib";
import { Middleware, UsersRoleEnum } from "../../../lib/internal.lib";
import { TICKETS_APIS_CONFIG } from "./tickets.configs";
import { TicketsControllers } from "./tickets.controllers";
import { TicketsSchemasValidations } from "./tickets.schemas";

const TicketsRoutes = Router();

TicketsRoutes.post(
  TICKETS_APIS_CONFIG.createTicket,
  Middleware.authorize([UsersRoleEnum.USER], true, null),
  Middleware.requestDataValidator(TicketsSchemasValidations.createTicket),
  TicketsControllers.createTicket
);

TicketsRoutes.post(
  TICKETS_APIS_CONFIG.getTicketDetails,
  Middleware.authorize(
    [UsersRoleEnum.USER, UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN],
    true,
    null
  ),
  Middleware.requestDataValidator(TicketsSchemasValidations.getTicketDetails),
  TicketsControllers.getTicketDetails
);

// TicketsRoutes.post(
//   TICKETS_APIS_CONFIG.getTickets,
//   Middleware.authorize(
//     [UsersRoleEnum.USER, UsersRoleEnum.ADMIN, UsersRoleEnum.SUPER_ADMIN],
//     true,
//     null
//   ),
//   Middleware.requestDataValidator(TicketsSchemasValidations.getTickets),
//   TicketsControllers.getTickets
// );

export { TicketsRoutes };
