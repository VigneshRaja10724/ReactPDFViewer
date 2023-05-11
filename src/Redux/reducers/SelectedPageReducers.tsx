import { AnyAction } from "redux";

const selectedPages : any =[];

export const SelectedPageReducer = (state = selectedPages, action : any) =>{
console.log(state);
console.log(action);
switch(action.type){

    case 'Set_Selected_Pages' :
    return {pages : action.payload }

    default :
    return state
}
}