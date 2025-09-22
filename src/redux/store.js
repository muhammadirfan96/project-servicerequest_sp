import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenSlice.js";
import notificationReducer from "./notificationSlice.js";
import confirmationReducer from "./confirmationSlice.js";
import projectsReducer from "./projectsSlice.js";

const store = configureStore({
  reducer: {
    jwToken: tokenReducer,
    notificationAlert: notificationReducer,
    confirmationAlert: confirmationReducer,
    projects: projectsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Menonaktifkan pengecekan serializability
    }),
});

export default store;
