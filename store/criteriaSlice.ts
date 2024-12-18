import { Criteria, Language, Skill } from "@/constants/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Criteria = {
  jobTitle: "",
  educationStatus: "",
  militaryStatus: "",
  gender: "",
  skills: [],
  certificates: [],
  languages: [],
};

const criteriaSlice = createSlice({
  name: "criteria",
  initialState,
  reducers: {
    setCriteria(state: Criteria, action: PayloadAction<Criteria>) {
      return action.payload;
    },
    updateCriteria(state: Criteria, action: PayloadAction<Partial<Criteria>>) {
      return { ...state, ...action.payload };
    },

    addItem(
      state: Criteria,
      action: PayloadAction<{ itemType: keyof Criteria; item: any }>
    ) {
      const { itemType, item } = action.payload;
      (state[itemType] as Skill[] | Language[] | string[]).push(item);
    },
    updateItem<T>(
      state: Criteria,
      action: PayloadAction<{
        itemType: keyof Criteria;
        index: number;
        value: T;
      }>
    ) {
      const { itemType, index, value } = action.payload;
      if (Array.isArray(state[itemType])) {
        (state[itemType] as T[])[index] = value;
      }
    },
    removeItem(
      state: Criteria,
      action: PayloadAction<{ itemType: keyof Criteria; index: number }>
    ) {
      const { itemType, index } = action.payload;
      if (Array.isArray(state[itemType])) {
        (state[itemType] as any[]).splice(index, 1);
      }
    },
    clearCriteria(state: Criteria) {
      return initialState;
    },
  },
});

export const {
  setCriteria,
  updateCriteria,
  addItem,
  updateItem,
  removeItem,
  clearCriteria,
} = criteriaSlice.actions;
export default criteriaSlice.reducer;
