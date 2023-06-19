import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

export const Thumbnail = ({ index, thumbnail, initialThumbnailsIndex }: any) => {
  const [UpdatedThumbnailIndex, setUpdatedThumbnailIndex] = useState<any[]>([]);

  const moveThumbnails = (startIndex: any, endIndex: any) => {
    console.log(startIndex, endIndex)
    const currentThumbnails = [...initialThumbnailsIndex]; // array of thumbnails
    // Remove the pageIndex from the startIndex
    const [thumbnail] = currentThumbnails.splice(startIndex, 1);
    // Insert the pageIndex at the endIndex
    currentThumbnails.splice(endIndex, 0, thumbnail);
    console.log(currentThumbnails)
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
    </div>
  );
};
