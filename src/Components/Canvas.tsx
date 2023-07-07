import React, { useState, useRef } from 'react';

const ImageEditor: React.FC = () => {
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);
  const [endY, setEndY] = useState<number | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement[]>([]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button === 0) {
      const { clientX, clientY } = event;
      const { left, top } = event.currentTarget.getBoundingClientRect();
      setStartX(clientX - left);
      setStartY(clientY - top);
    }
    setIsDrawing(true);
  };

  const handleMouseUp = (event: any) => {
    console.log(startX, startY, endX, endY);
    if (startX !== null && startY !== null && endX !== null && endY !== null) {
      const { offsetX, offsetY } = event.nativeEvent;

      if (canvasContainerRef.current) {
        // Create a new canvas element
        const width = endX - startX;
        const height = endY - startY;
        const newCanvas = document.createElement('canvas');
        newCanvas.width = width; // Customize the canvas size according to your needs
        newCanvas.height = height;
        newCanvas.style.position = 'absolute';
        newCanvas.style.top = `${startX}px`;
        newCanvas.style.left = `${startY}px`;

        // Add the new canvas to the container
        canvasContainerRef.current.appendChild(newCanvas);

        // Store the canvas reference for future use
        canvasRef.current.push(newCanvas);
      }
      setStartX(null);
      setStartY(null);
      setEndX(null);
      setEndY(null);
      setIsDrawing(false);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (startX !== null && startY !== null) {
      const { clientX, clientY } = event;
      const { left, top } = event.currentTarget.getBoundingClientRect();
      const width = clientX - left - startX;
      const height = clientY - top - startY;
      setEndX(clientX - left);
      setEndY(clientY - top);

      if (!isDrawing) return;

      if (canvasContainerRef.current && canvasRef.current.length > 0) {
        const context = canvasRef.current[canvasRef.current.length - 1].getContext('2d');

        if (context) {
          const canvas = canvasRef.current[canvasRef.current.length - 1];
          canvas.width = width;
          canvas.height = height;
          context.fillStyle = 'white';
          context.fillRect(0, 0, width, height); // Customize the rectangle size and position according to your needs
        }
      }
    }
  };

  const removeLatestCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current.length > 0) {
      const latestCanvas = canvasRef.current.pop();

      if (latestCanvas) {
        canvasContainerRef.current.removeChild(latestCanvas);
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
            width: '500px', // Customize the width and height according to your needs
            height: '500px',
            backgroundColor: 'lightgray', // Customize the background color of the drawing area
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
      <button onClick={removeLatestCanvas}>Remove Latest Canvas</button>
    </div>
  );
};

export default ImageEditor;
