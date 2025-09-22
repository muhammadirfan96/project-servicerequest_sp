import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    nama: "punagaya",
    menu: false,
  },
  reducers: {
    setProjectsNama(state, action) {
      state.nama = action.payload;
    },
    setMenu(state, action) {
      state.menu = action.payload;
    },
  },
});

export const { setProjectsNama, setMenu } = projectsSlice.actions;
export default projectsSlice.reducer;
