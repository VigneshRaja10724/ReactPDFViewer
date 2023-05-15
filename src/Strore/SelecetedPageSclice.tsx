import { createSlice } from "@reduxjs/toolkit";

export interface pdf{
    angle : number,
    pagesSelected : string[]
}
const initialState : pdf ={
    angle : 0,
    pagesSelected : []
}

export const SelectedPages = createSlice({ // instead of having action and reducer in seperate, we can combine it in slice 
    name: 'selectPage',
    initialState,
    reducers:{
        pageSelected : (state,action) =>{
            state.pagesSelected = action.payload;
        }
    } 
});

export const {pageSelected} = SelectedPages.actions;