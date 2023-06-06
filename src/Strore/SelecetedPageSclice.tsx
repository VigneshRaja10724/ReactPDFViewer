import { createSlice } from "@reduxjs/toolkit";

export interface pdf{
    NumberOfPages : number,
    angle : number,
    pagesSelected : number[],
    deletedPages : string[]
}
const initialState : pdf ={
    NumberOfPages : 0,
    angle : 0,
    pagesSelected : [0],
    deletedPages : []
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
        },
        deletedPages : (state, action) =>{
            state.deletedPages = action.payload;
        }
    } 
});

export const {pageSelected, totalPages, deletedPages} = SelectedPages.actions;