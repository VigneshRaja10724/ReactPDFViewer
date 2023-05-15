import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Strore/store";
export const LoadSelectedThumbnails = () =>{
    const pages   = useSelector((state : RootState) => state.selectPage.pagesSelected);
    useEffect(()=>{
        console.log(pages)
    },[pages])
    return(
        <p>
             Selected pages:{' '}{}
         {pages
            .map((v : any) => 
            (v+1)
            )
            .filter(Number)
            .join(',')
            }
        </p>
    );
}