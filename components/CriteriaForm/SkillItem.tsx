import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import React from "react";
import RemoveButton from "./RemoveButton";
import { Skill } from "@/constants/types";
import { useDispatch } from "react-redux";
import { updateItem, removeItem } from "@/store/criteriaSlice";
import type { AppDispatch } from "@/store";
import { skills } from "@/constants/data";

export type SkillItemProps = {
  skill: Skill;
  index: number;
};

export default function SkillItem({ skill, index }: SkillItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (value: Skill) => {
    dispatch(
      updateItem({
        itemType: "skills",
        index,
        value,
      })
    );
  };
  const handleRemove = () => {
    dispatch(removeItem({ itemType: "skills", index }));
  };

  return (
    <div className="flex gap-2 items-center">
      <Autocomplete
        label="Skill"
        size="sm"
        onInputChange={(value) =>
          handleChange({ ...skill, skill: String(value) })
        }
      >
        {skills.map((option) => (
          <AutocompleteItem key={option}>{option}</AutocompleteItem>
        ))}
      </Autocomplete>
      <Input
        label="Experience"
        size="sm"
        value={String(skill.experience)}
        onChange={(e) => handleChange({ ...skill, experience: e.target.value })}
        type="number"
      />
      <RemoveButton onRemove={handleRemove} />
    </div>
  );
}
