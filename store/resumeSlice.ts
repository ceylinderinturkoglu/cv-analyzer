import { Resume } from "@/constants/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Resume = {
  name: "",
  jobTitle: "",
  about: "",
  educationStatus: "",
  educations: [],
  experiences: [],
  skills: [],
  projects: [],
  certificates: [],
  languages: [],
  references: [],
  contact: { email: "", phone: "", address: "", links: [] },
  militaryStatus: "",
  gender: "",
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setResume(state, action: PayloadAction<Resume>) {
      return action.payload;
    },
    clearResume() {
      return initialState;
    },
  },
});

export const { setResume, clearResume } = resumeSlice.actions;
export default resumeSlice.reducer;
