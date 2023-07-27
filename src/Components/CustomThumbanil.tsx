import { RenderThumbnailItemProps } from "@react-pdf-viewer/thumbnail";
import { useState } from "react";
import { DragDropComponent } from "./DragDropComponent";


export const CustomThumbnail = ({ Thumbnails, setDropIndex }: any) => {

  const [thumbnails, setThumbnails] = useState<any[]>([]);
    const [reRender, setreRender] = useState<boolean>(false)


    const handleDrop = (dragIndex: any, dropIndex: any) => {
        console.log(dragIndex, dropIndex)
        const draggedItem = thumbnails[dragIndex];
        const updatedItems = [...thumbnails];
        updatedItems.splice(dragIndex, 1);
        updatedItems.splice(dropIndex, 0, draggedItem);
        setThumbnails(updatedItems);
        setreRender(true)
        setDropIndex(dropIndex)
    };

    const renderSpinner = (props : any) => {
        console.log(props)
    }

    const renderThumbnailItem = (props: RenderThumbnailItemProps) => {
        if (reRender) {
            const thumbnail = thumbnails[props.pageIndex];
            return (
            
                <DragDropComponent
                    key={thumbnail.key}
                    props={thumbnail}
                    index={props.pageIndex}
                    setThumbnails={ setThumbnails}
                    handleDrop={handleDrop}
                    thumbnails={ thumbnails}
                />
            )
        }
        return (
            <DragDropComponent
                key={props.key}
                props={props}
                index={props.pageIndex}
                setThumbnails={setThumbnails}
                handleDrop={handleDrop}
                thumbnails={thumbnails}
            />
        );
    }

    return (
        <>
            <Thumbnails renderSpinner={renderSpinner} renderThumbnailItem={renderThumbnailItem} /> :

        </>
    );

}