import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { pageSelected } from "../Strore/SelecetedPageSclice";
import { useDispatch } from "react-redux";

export const DragDrop = ({ props, index, setThumbnails, handleDrop, thumbnails, setPageIndex }: any) => {

    useEffect(() => {
        const thumbnailExist = thumbnails.find((item: any) => item.pageIndex === props.pageIndex);
        if (thumbnailExist) {
            const replacedThumbnails = [...thumbnails]
            const thumbnailIndex = replacedThumbnails.indexOf(thumbnailExist);
            replacedThumbnails[thumbnailIndex] = props;
            setThumbnails(replacedThumbnails)
        } else {
            if (thumbnails.length <= props.numPages) {
                setThumbnails((previousState: any) => {
                    return [...previousState, props]
                })
            }
        }
    }, [index])

    const dispatch = useDispatch();
    const [selectedPages, setSelectedPages] = useState<any[]>([]);
    const [color, setColor] = useState<string>("rgba(0, 0, 0, 0.3)");

    useEffect(()=>{
        console.log(selectedPages)
    },[selectedPages])
    const handleChoosePage = (e: any, props: any) => {
        setPageIndex(props.pageIndex)
        // console.log("initial", props.renderPageThumbnail.props.pageRotation);
        if (e.ctrlKey) {
            if (selectedPages[props.pageIndex] === undefined) {
                const copy = [...selectedPages];
                copy[props.pageIndex] = props.pageIndex;
                console.log(copy)
                setSelectedPages(copy);
                setColor("rgba(0, 0, 0, 0.3)");
                dispatch(pageSelected(copy));
            }

            if (selectedPages[props.pageIndex] === props.pageIndex) {
                const copy = [...selectedPages];
                copy[props.pageIndex] = undefined;
                setSelectedPages(copy);
                dispatch(pageSelected(copy));
            }
        }
    };

    const [{ isDragging }, drag] = useDrag({
        type: 'THUMBNAIL',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'THUMBNAIL',
        drop: (droppedItem: any) => {
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
                <div
                    onClick={(e) => handleChoosePage(e, props)}
                    key={props.pageIndex}
                    className="custom-thumbnail-item"
                    data-testid={`thumbnail-${props.pageIndex}`}
                    style={{
                        // backgroundColor: props.pageIndex === selectedPages[props.pageIndex] ? color : "#fff",
                        backgroundColor:  selectedPages[props.pageIndex] ? color : '#fff',
                        cursor: "pointer",
                        padding: "0.1rem",
                        width: "7rem",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                        onClick={props.onJumpToPage}
                    >
                        {props.renderPageThumbnail}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {props.renderPageLabel}
                    </div>
                </div>
            </div>
        </div>
    );
}