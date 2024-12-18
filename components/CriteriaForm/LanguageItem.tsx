import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React from "react";
import RemoveButton from "./RemoveButton";
import { Criteria, Language } from "@/constants/types";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCriteria,
  clearCriteria,
  addItem,
  updateItem,
  removeItem,
} from "@/store/criteriaSlice";
import type { RootState, AppDispatch } from "@/store";
import { languageLevels, languages } from "@/constants/data";

export type LanguageItemProps = {
  language: Language;
  index: number;
};

export default function LanguageItem({ language, index }: LanguageItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (value: Language) => {
    dispatch(
      updateItem({
        itemType: "languages",
        index,
        value,
      })
    );
  };

  const handleRemove = () => {
    dispatch(removeItem({ itemType: "languages", index }));
  };

  return (
    <div className="flex gap-2 items-center">
      <Autocomplete
        label="Language"
        size="sm"
        onInputChange={(value) =>
          handleChange({ ...language, language: value })
        }
      >
        {languages.map((option) => (
          <AutocompleteItem key={option}>{option}</AutocompleteItem>
        ))}
      </Autocomplete>
      <Select
        label="Level"
        size="sm"
        selectedKeys={[language.level]}
        onChange={(e) => handleChange({ ...language, level: e.target.value })}
      >
        {languageLevels.map((option) => (
          <SelectItem key={option}>{option}</SelectItem>
        ))}
      </Select>
      <RemoveButton onRemove={handleRemove} />
    </div>
  );
}
