import { createStore } from "redux"
import { SelectedPageReducer } from "../reducers/SelectedPageReducers"
import { configureStore } from "@reduxjs/toolkit"

export  const store = createStore(SelectedPageReducer)
// export const store = configureStore({
   
//     reducer: {
//         select: SelectedPageReducer
//       }
    
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;