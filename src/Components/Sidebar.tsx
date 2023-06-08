import { useEffect } from "react";

export const Sidebar = ({selectedOption , docName} : any) => {
    useEffect(()=>{
        if(selectedOption === "Non-Ship"){
            docName("Misc")
        }else{
            docName("Request Letter")
        }
    },[selectedOption])
    const handelClick = (value : any) => {
        docName(value)
    }
    if(selectedOption === "Ship"){
        return (
            < >
                <img 
                style={{ width: "2rem", textAlign: "center", padding: "1px", cursor : "pointer" }} 
                src="icons/file-earmark-fill.svg"
                onClick ={() => handelClick("Request Letter")} />
                <img 
                style={{ width: "2rem", textAlign: "center", padding: "1px", cursor : "pointer" }} 
                src="icons/file-earmark-text-fill.svg"
                onClick ={() => handelClick("Medical Records")} />
                <img
                 style={{ width: "2rem", textAlign: "center", padding: "1px", cursor : "pointer" }}
                  src="icons/file-text-fill.svg"
                  onClick ={() => handelClick("Certification")} />
                <span style={{
                    paddingBottom:"40px",
                    textAlign: "center",
                    transform: 'rotate(180deg)',
                    writingMode: 'vertical-lr',
                  
                }}>Shippable Docs</span>
            </>
        );
    }else{
        
        return(
            <>
            <img 
            style={{ width: "2rem", textAlign: "center", padding: "1px", cursor : "pointer" }} 
            src="icons/file-earmark-fill.svg"
            onClick ={() => handelClick("Misc")} />
            <span style={{
                    paddingBottom:"80px",
                    textAlign: "center",
                    transform: 'rotate(180deg)',
                    writingMode: 'vertical-lr',
                  
                }}>Miscellaneous Docs</span>
            </>
        );
    }
   
};