import { RenderThumbnailItemProps } from "@react-pdf-viewer/thumbnail";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { pageSelected } from "../Strore/SelecetedPageSclice";
import { DragDrop } from "./DragDrop";

export const CustomThumbnail = ({ Thumbnail, setPageIndex }: any) => {

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
  };

  const renderThumbnailItem = (props: RenderThumbnailItemProps) => {
    if (reRender) {
      const thumbnail = thumbnails[props.pageIndex];
      return (

        <DragDrop
          key={thumbnail.key}
          props={thumbnail}
          index={props.pageIndex}
          setThumbnails={setThumbnails}
          handleDrop={handleDrop}
          thumbnails={thumbnails}
          setPageIndex = {setPageIndex}
        />
      )
    }
    return (
      <DragDrop
        key={props.key}
        props={props}
        index={props.pageIndex}
        setThumbnails={setThumbnails}
        handleDrop={handleDrop}
        thumbnails={thumbnails}
        setPageIndex ={setPageIndex}
      />
    );
  }
  return (
    <>
      <Thumbnail renderThumbnailItem={renderThumbnailItem} />
    </>
  );
} 