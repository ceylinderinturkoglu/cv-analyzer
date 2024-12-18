import React from "react";
import AddButton from "./AddButton";
import { Criteria, Language, Skill } from "@/constants/types";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import {
  updateCriteria,
  clearCriteria,
  addItem,
  updateItem,
  removeItem,
} from "@/store/criteriaSlice";

export type GroupSectionProps<T> = {
  title: string;
  itemType: keyof Criteria;
  defaultItemValue: Skill | Language | string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
};

export default function GroupSection<T extends unknown>({
  title,
  itemType,
  defaultItemValue,
  items,
  renderItem,
}: GroupSectionProps<T>) {
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = () => {
    dispatch(addItem({ itemType, item: defaultItemValue }));
  };

  return (
    <div className="group flex flex-col gap-1">
      <h3>{title}</h3>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <React.Fragment key={index}>{renderItem(item, index)}</React.Fragment>
        ))}
      </div>
      <AddButton itemsLength={items.length} onAddItem={handleAdd} />
    </div>
  );
}
