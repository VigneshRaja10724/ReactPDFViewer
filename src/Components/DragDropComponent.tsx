import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { totalPages } from "../Strore/SelecetedPageSclice";

export const DragDropComponent = ({ props, index, setThumbnails, handleDrop, thumbnails }: any) => {
    // const [thumbnail, setThumbnail] = useState<any[]>([]);


    useEffect(() => {
        console.log(props)

        const thumbnailExist = thumbnails.find((item  : any) => item.pageIndex === props.pageIndex);
        if (thumbnailExist) {
            const replacedThumbnails = [...thumbnails]
            const thumbnailIndex = replacedThumbnails.indexOf(thumbnailExist);
            console.log(thumbnailIndex);
            replacedThumbnails[thumbnailIndex] = props;
            console.log(replacedThumbnails)
            setThumbnails([...replacedThumbnails])
        } else {
            if (thumbnails.length <= props.numPages) {
                setThumbnails((previousState: any) => {
                    return [...previousState, props]
                })
            }
          
        }

       
    }, [index])

    const [{ isDragging }, drag] = useDrag({
        type: 'ITEM',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'ITEM',
        drop: (droppedItem: any) => {
            console.log(droppedItem.index, index)
            handleDrop(droppedItem.index, index)
        },
        collect: monitor => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
    });

    const opacity = isDragging ? 0.5 : 1;
    const backgroundColor = canDrop && isOver ? 'red' : 'white';

    return (
        <div ref={(node) => drag(drop(node))} style={{ opacity, backgroundColor }}>
            <div style={{ marginBottom: '0.5rem' }} onClick={props.onJumpToPage}>
                {props.renderPageThumbnail}
                {props.renderPageLabel}
            </div>
            {/* <Thumbnail props={item}/> */}
        </div>
    );
}