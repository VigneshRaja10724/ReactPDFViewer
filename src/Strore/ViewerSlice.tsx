import { createSlice } from "@reduxjs/toolkit"

interface ViewerState {
    showMarquee : boolean
}

const initialState : ViewerState  = {
    showMarquee : true
}

export const ViewerProps = createSlice({ 
    name : "Viewer State",
    initialState,
    reducers : {
        ShowMarquee : (state, action) => {
            state.showMarquee = action.payload;
        }
    }
})

export const {ShowMarquee} = ViewerProps.actions