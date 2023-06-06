interface PDF {
    totalPages : number,
    selectedPages : number[],
    deletePages : []
}
const initialpdf: PDF = {
    totalPages : 0,
    selectedPages : [0],
    deletePages : []
};

export const PDFReducer = (state = initialpdf, action: any) => {
    switch (action.type) {
        
        case 'Set_total_Pages':
            return {...state, totalPages : action.payload }
        case 'Set_Selected_Pages':
            return {...state, selectedPages: action.payload }
        case 'Set_deleted_Pages':
            return {...state, deletePages: action.payload }

        default:
            return state
    }
}