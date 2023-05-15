import { SelectedPageReducer } from "../reducers/SelectedPageReducers"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
   
    reducer: {
        selectPage: SelectedPageReducer
      }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;