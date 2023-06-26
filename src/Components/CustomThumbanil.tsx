import { RenderThumbnailItemProps } from "@react-pdf-viewer/thumbnail";
import { useEffect, useState } from "react";
import { DragDropComponent } from "./DragDropComponent";
import { Thumbnail } from "./Thumbnail";


export const CustomThumbnail = ({ Thumbnails, totalPages }: any) => {
    const [thumbnails, setThumbnails] = useState<any>([]);
    const [updatedThumbnails, setUpdatedThumbnails] = useState<any>([]);
    const [reRender, setreRender] = useState<boolean>(false)


    const handleDrop = (dragIndex: any, dropIndex: any) => {
        console.log(dragIndex, dropIndex)
        const updatedItems = [...thumbnails];
        const [dragItem] = updatedItems.splice(dragIndex, 1);
        console.log(dragIndex)
        console.log(dropIndex)
        console.log(dragItem)
        updatedItems.splice(dropIndex, 0, dragItem);
        console.log(updatedItems)
        setUpdatedThumbnails(updatedItems);
        setreRender(true)
    };

    useEffect(() => {
        console.log(thumbnails)
    }, [thumbnails.length === totalPages])
    useEffect(() => {
        console.log(Thumbnails)
    }, [])

    useEffect(() => {
        console.log(updatedThumbnails)
    }, [updatedThumbnails])

    const renderThumbnailItem = (props: RenderThumbnailItemProps) => {
        return (
            <DragDropComponent key={props.key} props={props} index={props.pageIndex} setThumbnails={setThumbnails} handleDrop={handleDrop} />
        );
    }


    return (
        <>
            <Thumbnails renderThumbnailItem={renderThumbnailItem} />
        </>
    );

}