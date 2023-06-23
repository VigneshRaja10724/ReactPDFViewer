import { useEffect } from "react";
import { addThumbnail, renderThumbnail } from "../Strore/ThumbnailsSlice";
import { useDispatch } from "react-redux";

export const RenderTHumbnails = ({props, totalPages} :any ) =>{
    const dispatch =  useDispatch();
    useEffect(()=>{
        console.log("rendering")
        console.log(props.pageIndex)
        dispatch(addThumbnail(props));
        if(props.pageIndex + 1 === totalPages){
            dispatch(renderThumbnail(true))
        }
    },[])

    return(
        <div>
            <p>Loading....</p>
        </div>
    )
}