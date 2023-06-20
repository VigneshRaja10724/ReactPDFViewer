import { RenderThumbnailItemProps } from "@react-pdf-viewer/thumbnail";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Strore/store";
import { Thumbnail } from "./Thumbnails";


export const CustomThumbnail = ({ Thumbnails }: any) => {
    const [updatedIndexs, setUpdatedIndexs] = useState<any[]>();
    const state = useSelector((state: RootState) => state);
    const thumbnails = state.thumbnails;

    useEffect(()=>{
        console.log(Thumbnails)
    },[])
    
    useEffect(()=>{
        console.log(thumbnails)
      },[thumbnails])

    useEffect(()=>{
        console.log(updatedIndexs)
    },[updatedIndexs])
   

    const renderThumbnailItem = (props: RenderThumbnailItemProps) =>{
        // dispatch(addThumbnail(props))
        return(
        <div
            key={props.pageIndex}
            className="custom-thumbnail-item"
            data-testid={`thumbnail-${props.pageIndex}`}
            style={{
                backgroundColor: props.pageIndex === props.currentPage ? 'rgba(0, 0, 0, 0.3)' : '#fff',
                cursor: 'pointer',
                padding: '0.5rem',
                width: '100%',
            }}
        >
            <div style={{ marginBottom: '0.5rem' }} onClick={props.onJumpToPage}>

                <Thumbnail
                    index={props.pageIndex}
                    thumbnail={props.renderPageThumbnail}
                    initialThumbnailsIndex={thumbnails}
                    setUpdatedIndexs = { setUpdatedIndexs}
                />
            </div>
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '0 auto',
                    width: '100px',
                }}
            >
                <div style={{ marginRight: 'auto' }}>
                    {props.renderPageLabel}
                </div>

            </div>
        </div>
    );}
    return (
        <>
            <Thumbnails renderThumbnailItem={renderThumbnailItem} />
        </>
    );
}