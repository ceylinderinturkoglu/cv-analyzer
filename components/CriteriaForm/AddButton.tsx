import React from "react";
import { HiPlus } from "react-icons/hi2";

export default function AddButton({
  itemsLength,
  onAddItem,
}: {
  itemsLength: number;
  onAddItem: () => void;
}) {
  return (
    <button
      className={`col-span-3 py-1 flex justify-center text-gray-300 bg-slate-900 w-full rounded-md ${itemsLength === 0 ? "translate-y-0 opacity-100" : "opacity-0"} -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all ease-in-out duration-200`}
      aria-label="Add"
      onClick={onAddItem}
    >
      <HiPlus size={12} />
    </button>
  );
}
