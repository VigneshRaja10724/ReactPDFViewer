import React from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const DNDExample = () => {
  const [values, setValues] = React.useState<any[]>([1, 2, 3, 4, 5]);

  const moveValue = (dragIndex: number, hoverIndex: number) => {
    const draggedValue = values[dragIndex];
    const newValues = [...values];
    newValues.splice(dragIndex, 1);
    newValues.splice(hoverIndex, 0, draggedValue);
    setValues(newValues);
  };

  const Value  = ({ value, index  } : any) => {
    // const [{ isDragging }, drag] = useDrag(() => ({
    //   type: 'value',
    //   item: { index },
    //   collect: (monitor) => ({
    //     isDragging: !!monitor.isDragging(),
    //   }),
    // }));

    // const [, drop] = useDrop(() => ({
    //   accept: 'value',
    //   hover: (item: { index: number }) => {
    //     if (item.index !== index) {
    //       moveValue(item.index, index);
    //     }
    //   },
    // }));

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
            moveValue(droppedItem.index, index)
        },
        collect: monitor => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
    });

    return (
      <div
        ref={(node) => drag(drop(node))}>
       Item : {value}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div>
          {values.map((value, index) => (
            <Value key={index} value={value} index={index} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};