import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { addThumbnail } from "../Strore/ThumbnailsSlice";

export const Thumbnail = ({ index, thumbnail, initialThumbnailsIndex, setUpdatedIndexs }: any) => {
  const [UpdatedThumbnailIndex, setUpdatedThumbnailIndex] = useState<any[]>([]);
  const [isThumbnailUpdated, setIsThumbnailUpdated] = useState<boolean>(false)

  const dispatch = useDispatch();

  useEffect(() =>{
    console.log(isThumbnailUpdated)
    console.log(thumbnail)
  },[index])
  useEffect(() => {
    dispatch(addThumbnail(thumbnail))
  }, [index])
  
  useEffect(()=>{
    setUpdatedIndexs(UpdatedThumbnailIndex)
    setIsThumbnailUpdated(true)
  },[UpdatedThumbnailIndex])


  const moveThumbnails = (startIndex: any, endIndex: any) => {
    console.log(startIndex, endIndex)
    const currentThumbnails = [...initialThumbnailsIndex]; // array of thumbnails
    // Remove the pageIndex from the startIndex
    const [thumbnail] = currentThumbnails.splice(startIndex, 1);
    // Insert the pageIndex at the endIndex
    currentThumbnails.splice(endIndex, 0, thumbnail);
    // Update the thumbnails array with the new order
    setUpdatedThumbnailIndex(currentThumbnails);
    // console.log(updatedThumbnails)
  };

  const [{ isDragging }, drag] = useDrag({
    type: "thumbnail",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'thumbnail',
    hover(item: any) {
      if (item.index === index) {
        return;
      }
      moveThumbnails(item.index, index);
      item.index = index;
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {thumbnail}
      {isThumbnailUpdated ? (UpdatedThumbnailIndex[0]) : (thumbnail)}
    </div>
  );
};