import { createSlice } from "@reduxjs/toolkit";

interface DataState {
    thumbnails : any[]; 
    renderThums : boolean;
  }
  
  const initialState: DataState = {
    thumbnails: [],
    renderThums : false
  }
export const LoadThumbnails = createSlice ({
    name: 'loadThumbnails', 
    initialState,
    reducers:{
        addThumbnail : (state, action) =>{
            const data = action.payload;
            state.thumbnails = [...state.thumbnails, data]
           console.log(state.thumbnails)
        },
        renderThumbnail : (state , action) =>{
          console.log(action.payload)
          state.renderThums = action.payload
        }
    }
});

export const { addThumbnail, renderThumbnail } = LoadThumbnails.actions;