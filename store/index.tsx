import { configureStore } from "@reduxjs/toolkit";
import criteriaReducer from "./criteriaSlice";
import resumeReducer from "./resumeSlice";
import analysisReducer from "./analysisSlice";

const store = configureStore({
  reducer: {
    criteria: criteriaReducer,
    resume: resumeReducer,
    analysis: analysisReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
