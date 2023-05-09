import { useContext } from "react";
import {PageContext} from "./../App"

export const LoadSelectedThumbnails = () =>{
    const {selectedPages} : any  = useContext(PageContext);
    return(
        <p>
             Selected pages:{' '}
         {selectedPages
            .map((value : number, index: number) => 
                ( value + 1 )
            )
            .filter(Number)
            .join(',')
            }
        </p>
    );
}