import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { SelectedPages } from "./SelecetedPageSclice";
import { WebsocketSlice } from "./WebsocketSlice";
import { LoadThumbnails } from "./ThumbnailsSlice";


export const store = configureStore({
  reducer: {
    selectPage: SelectedPages.reducer,
    websocket : WebsocketSlice.reducer,
    thumbnails : LoadThumbnails.reducer
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({ // to get the object no serilized from the server making it false
    serializableCheck : false
  })
});

export type RootState = ReturnType<typeof store.getState>; //used to get the data from the store
export type AppDispatch = typeof store.dispatch;
