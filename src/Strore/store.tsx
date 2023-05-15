import { configureStore } from "@reduxjs/toolkit";
import { SelectedPages } from "./SelecetedPageSclice";

export const store = configureStore({
  reducer: {
    selectPage: SelectedPages.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; //used to get the data from the store
export type AppDispatch = typeof store.dispatch;
