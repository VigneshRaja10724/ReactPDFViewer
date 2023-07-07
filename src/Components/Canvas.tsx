import React, { useState, useRef } from 'react';

const ImageEditor: React.FC = () => {
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);
  const [endY, setEndY] = useState<number | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const textInputsRef = useRef<HTMLInputElement[]>([]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button === 0) {
      const { clientX, clientY } = event;
      const { left, top } = event.currentTarget.getBoundingClientRect();
      setStartX(clientX - left);
      setStartY(clientY - top);
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    if (startX !== null && startY !== null && endX !== null && endY !== null) {
      if (canvasContainerRef.current) {
        const width = endX - startX;
        const height = endY - startY;

        if (width > 0 && height > 0) {
          // Create a text input element
          const newTextInput = document.createElement('input');
          newTextInput.type = 'text';
          newTextInput.style.position = 'absolute';
          newTextInput.style.top = `${startY}px`;
          newTextInput.style.left = `${startX}px`;
          newTextInput.style.width = `${width}px`;
          newTextInput.style.height = `${height}px`;

          // Add the text input to the container
          canvasContainerRef.current.appendChild(newTextInput);

          // Store the text input reference
          textInputsRef.current.push(newTextInput);
        }
      }
    }

    setStartX(null);
    setStartY(null);
    setEndX(null);
    setEndY(null);
    setIsDragging(false);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (startX !== null && startY !== null && isDragging) {
      const { clientX, clientY } = event;
      const { left, top } = event.currentTarget.getBoundingClientRect();
      setEndX(clientX - left);
      setEndY(clientY - top);
    }
  };

  const removeLatestTextInput = () => {
    if (canvasContainerRef.current && textInputsRef.current.length > 0) {
      const latestTextInput = textInputsRef.current.pop();

      if (latestTextInput) {
        canvasContainerRef.current.removeChild(latestTextInput);
      }
    }
  };

  return (
    <div>
      <div
        style={{ position: 'relative' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div ref={canvasContainerRef} style={{ position: 'absolute', top: 0, left: 0 }} />
        <div
          style={{
            width: '500px',
            height: '500px',
            backgroundColor: 'lightgray',
            border: '1px solid black',
          }}
        />
        {startX !== null && startY !== null && endX !== null && endY !== null && (
          <div
            style={{
              position: 'absolute',
              left: startX,
              top: startY,
              width: Math.abs(endX - startX),
              height: Math.abs(endY - startY),
              border: '2px solid red',
            }}
          />
        )}
      </div>
      <button onClick={removeLatestTextInput}>Remove Latest Textbox</button>
    </div>
  );
};

export default ImageEditor;
