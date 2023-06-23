import { useDrag, useDrop } from "react-dnd";

export const DragDropComponent = ({props, index} :any) => {
    console.log("DnD")
   
    // const [items, setItems] = useState<any[]>([
        // { id: 1, name: 'Item 1' },
        // { id: 2, name: 'Item 2' },
        // { id: 3, name: 'Item 3' },
    // ]);


    // const handleDrop = (dragIndex: any, dropIndex: any) => {
    //     const updatedItems = [...items];
    //     const [dragItem] = updatedItems.splice(dragIndex, 1);
    //     console.log(dragIndex)
    //     console.log(dropIndex)
    //     console.log(dragItem)
    //     updatedItems.splice(dropIndex, 0, dragItem);
    //     console.log(updatedItems)
    //     setItems(updatedItems);
    // };


    // const Item = ({ item, index }: any) => {

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
                // handleDrop(droppedItem.index, index);
            },
            collect: monitor => ({
                canDrop: monitor.canDrop(),
                isOver: monitor.isOver(),
              }),
        });

        const opacity = isDragging ? 0.5 : 1;
        const backgroundColor = canDrop && isOver ? 'red' : 'white';

        return (
            <div ref={(node) => drag(drop(node))} style={{opacity, backgroundColor }}>
                <div style={{ marginBottom: '0.5rem' }} onClick={props.onJumpToPage}>
                {props.renderPageThumbnail}
                {props.renderPageLabel}
            </div>
                {/* <Thumbnail props={item}/> */}
            </div>
        );
    }