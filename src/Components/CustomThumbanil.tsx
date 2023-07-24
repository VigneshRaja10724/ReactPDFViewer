import { RenderThumbnailItemProps } from "@react-pdf-viewer/thumbnail";
import { useEffect, useState } from "react";
import { DragDropComponent } from "./DragDropComponent";
import { render } from "@testing-library/react";


export const CustomThumbnail = ({ Thumbnails, totalPages }: any) => {
    const [thumbnails, setThumbnails] = useState<any[]>([]);
    const [reRender, setreRender] = useState<boolean>(false)


    const handleDrop = (dragIndex: any, dropIndex: any) => {
        const draggedItem = thumbnails[dragIndex];
        const updatedItems = [...thumbnails];
        updatedItems.splice(dragIndex, 1);
        updatedItems.splice(dropIndex, 0, draggedItem);
        setThumbnails([...updatedItems]);
        setreRender(true)
    };

    useEffect(() => {
        console.log("thumbnals ",thumbnails)
    }, [thumbnails])

    const renderThumbnailItem = (props: RenderThumbnailItemProps) => {
        if (reRender) {
            const thumbnail = thumbnails[props.pageIndex];
            return (
                <DragDropComponent
                    key={thumbnail.key}
                    props={thumbnail}
                    index={thumbnail.pageIndex}
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
            <Thumbnails renderThumbnailItem={renderThumbnailItem} /> :

        </>
    );

}