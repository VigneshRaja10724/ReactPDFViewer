import { createStore, combineReducers } from "redux"
import { PDFReducer } from "../reducers/PdfReducer"
import { WebSocketReducer } from "../reducers/WebSocketReducer"

const rootReducer =combineReducers({
    selectedPages : PDFReducer,
    WebSocketInit : WebSocketReducer
}) 

export  const store = createStore(rootReducer);