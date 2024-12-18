import { Analysis } from "@/constants/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Analysis = {
  matching_percentage: null,
  missing_criteria: [],
};

const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {
    setAnalysis(state: Analysis, action: PayloadAction<Analysis>) {
      return action.payload;
    },
    clearAnalysis(state: Analysis) {
      return initialState;
    },
  },
});

export const { setAnalysis, clearAnalysis } = analysisSlice.actions;
export default analysisSlice.reducer;
