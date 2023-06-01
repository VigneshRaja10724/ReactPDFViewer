import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { SelectedPages } from "./SelecetedPageSclice";
import { WebsocketSlice } from "./WebsocketSlice";


export const store = configureStore({
  reducer: {
    selectPage: SelectedPages.reducer,
    websocket : WebsocketSlice.reducer,
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck : false
  })
});

export type RootState = ReturnType<typeof store.getState>; //used to get the data from the store
export type AppDispatch = typeof store.dispatch;
