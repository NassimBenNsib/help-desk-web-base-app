"use client";

import {
  TICKET_CATEGORY_COLORS,
  TICKET_PRIORITY_COLORS,
  TICKET_STATUS_COLORS,
} from "@/common/constants";

const TableRow = (props: {
  ticket: any;
  index: number;
  onSelect: (id: string) => void;
  onOpen: (index: number) => void;
  selected: boolean;
}) => {
  return (
    <tr
      className="hover:bg-gray-100 "
      onDoubleClick={() => props.onOpen(props.index)}
    >
      <td className="p-4 w-4 lg:p-5 ">
        <div className="flex items-center">
          <input
            onClick={() => props.onSelect(props.ticket.id)}
            checked={props.selected}
            type="checkbox"
            className="w-5 h-5 rounded border-gray-300 focus:ring-0 checked:bg-dark-900 checkbox"
          />
        </div>
      </td>

      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap lg:p-5">
        <b>#{props.ticket.id}</b>
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap lg:p-5">
        {props.ticket.title.slice(0, 20) + "..."}
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap lg:p-5">
        <div className="flex items-center">
          <div
            className="h-2.5 w-2.5 rounded-full  mr-2"
            style={{
              backgroundColor:
                TICKET_CATEGORY_COLORS[
                  props.ticket.category as
                    | "GENERAL_INQUIRY"
                    | "TECHNICAL_ISSUE"
                    | "BUG_REPORT"
                    | "NEW_FEATURE_REQUEST"
                    | "NEW_PROJECT_REQUEST"
                    | "ACCOUNT_INQUIRY"
                    | "TRAINING_REQUEST"
                    | "FEEDBACK_AND_SUGGESTION"
                ],
            }}
          />
          {props.ticket.category
            .toLowerCase()
            .split("_")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </div>
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap lg:p-5">
        <div className="flex items-center">
          <div
            className="h-2.5 w-2.5 rounded-full  mr-2"
            style={{
              backgroundColor:
                TICKET_PRIORITY_COLORS[
                  props.ticket.priority as "LOW" | "NORMAL" | "HIGH" | "URGENT"
                ],
            }}
          />
          {props.ticket.priority}
        </div>
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap lg:p-5">
        <div className="flex items-center">
          <div
            className="h-2.5 w-2.5 rounded-full  mr-2"
            style={{
              backgroundColor:
                TICKET_STATUS_COLORS[
                  props.ticket.status as
                    | "CREATED"
                    | "OPENED"
                    | "PENDING"
                    | "SOLVED"
                    | "CLOSED"
                ],
            }}
          />
          {props.ticket.status}
        </div>
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap lg:p-5">
        {props.ticket.createdAt.slice(0, 11)}
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap lg:p-5">
        {props.ticket.updatedAt.slice(0, 11)}
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap lg:p-5">
        {props.ticket.tags.slice(0, 20) + "..."}
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap lg:p-5">
        {props.ticket.description.slice(0, 20) + "..."}
      </td>
    </tr>
  );
};

export { TableRow };
