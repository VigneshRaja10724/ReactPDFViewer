import { useEffect } from "react";
import { useSelector } from "react-redux";
export const LoadSelectedThumbnails = () =>{
    const pages   = useSelector((state : any) => state.pages);
    useEffect(()=>{
        console.log(pages)
    },[pages])
    return(
        <p>
             Selected pages:{' '}{pages}
         {/* {pages
            .map((v : number) => 
                ( v + 1 )
            )
            .filter(Number)
            .join(',')
            } */}
        </p>
    );
}