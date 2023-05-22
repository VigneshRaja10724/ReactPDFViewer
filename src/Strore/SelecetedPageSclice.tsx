import { createSlice } from "@reduxjs/toolkit";

export interface pdf{
    NumberOfPages : number,
    angle : number,
    pagesSelected : string[],
}
const initialState : pdf ={
    NumberOfPages : 0,
    angle : 0,
    pagesSelected : [],
}

export const SelectedPages = createSlice({ // instead of having action and reducer in seperate, we can combine it in slice 
    name: 'selectPage', 
    initialState,
    reducers:{
        pageSelected : (state,action) =>{
            state.pagesSelected = action.payload;
        },
        totalPages : (state, action) =>{
            state.NumberOfPages = action.payload;
        }
    } 
});

export const {pageSelected, totalPages} = SelectedPages.actions;