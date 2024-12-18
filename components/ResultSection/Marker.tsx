import { Badge, Tooltip } from "@nextui-org/react";
import React from "react";
import { FaExclamation } from "react-icons/fa6";

export default function Marker({ messages }: { messages: string[] }) {
  return (
    <Tooltip
      content={
        <ul className="list-disc list-inside">
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      }
      color="danger"
      showArrow={true}
    >
      <Badge
        content={<FaExclamation size={10} />}
        className="border-0  static translate-x-2 translate-y-0 w-[18px] h-[18px]"
        size="sm"
        color="danger"
        variant="shadow"
      >
        {""}
      </Badge>
    </Tooltip>
  );
}
