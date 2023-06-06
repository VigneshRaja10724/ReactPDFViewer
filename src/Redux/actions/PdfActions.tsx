export const totalPages = (data : any) =>{
return {
    type : 'Set_total_Pages',
    payload : data
}
}

export const SelectedPages = (data : any[]) =>{
    return {
        type : 'Set_Selected_Pages',
        payload : data
    }
    }

    export const deletedPages = (data : any[]) =>{
        return {
            type : 'Set_deleted_Pages',
            payload : data
        }
        }
