"use client";

import { TableRow } from "./table-row";

function TableBody(props: {
  rows: any[];
  onOpen: (index: number) => void;
  onSelect: (id: string) => void;
  loading: boolean;
  selected: Map<string, boolean>;
}) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {!props.loading &&
        props.rows.map((ticket: any, index: number) => {
          return (
            <TableRow
              onOpen={props.onOpen}
              onSelect={props.onSelect}
              key={ticket.id}
              ticket={ticket}
              index={index}
              selected={props.selected.get(ticket.id) || false}
            />
          );
        })}
      {props.loading && (
        <span className="loading loading-bars loading-lg"></span>
      )}
    </tbody>
  );
}

export { TableBody };
