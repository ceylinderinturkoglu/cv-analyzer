import { Button } from "@nextui-org/react";
import React from "react";
import { HiOutlineTrash, HiPlus } from "react-icons/hi2";

export default function RemoveButton({ onRemove }: { onRemove: () => void }) {
  return (
    <Button
      variant="faded"
      size="lg"
      color="danger"
      isIconOnly
      onClick={onRemove}
    >
      <HiOutlineTrash />
    </Button>
  );
}
