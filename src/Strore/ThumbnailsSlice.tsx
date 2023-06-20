import { createSlice } from "@reduxjs/toolkit";

export const LoadThumbnails = createSlice ({
    name: 'loadThumbnails', 
    initialState : []  as any[],
    reducers:{
        addThumbnail : (state, action) =>{
            state.push(action.payload);
        }
    }
});

export const { addThumbnail } = LoadThumbnails.actions;