import { Viewer } from "@react-pdf-viewer/core";
import { useState } from "react";

export const SampleZoom = () => {
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);
  const [endY, setEndY] = useState<number | null>(null);
  const [scale, setScale] = useState<number>(1);

  const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
    if (event.button === 0) {
      const { clientX, clientY } = event;
      const { left, top } = event.currentTarget.getBoundingClientRect();
      setStartX(clientX - left);
      setStartY(clientY - top);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    if (startX !== null && startY !== null) {
      const { clientX, clientY } = event;
      const { left, top } = event.currentTarget.getBoundingClientRect();
      setEndX(clientX - left);
      setEndY(clientY - top);
    }
  };

  const handleMouseUp = () => {
    if (startX !== null && startY !== null && endX !== null && endY !== null) {
      switch (scale) {
        case 1:
          setStartX(null);
          setStartY(null);
          setEndX(null);
          setEndY(null);
          setScale(2);
          return;
        case 2:
          setStartX(null);
          setStartY(null);
          setEndX(null);
          setEndY(null);
          setScale(3.5);
          return;
        default:
          setStartX(null);
          setStartY(null);
          setEndX(null);
          setEndY(null);
          setScale(1);
          return;
      }
    }
  };

  return (
    <>
      <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
        style={{
          overflow: "auto", // Prevents content overflow
          position: "relative" // Ensure the wrapper is positioned relative to the container
        }}
      >
        <div
          
          style={{
            cursor: "zoom-in",
            userSelect: "none",
            height: "40rem",
            transformOrigin: `${startX}px ${startY}px `,
            transform: `scale(${scale})`,
          }}
        >
          {/* <div
            style={{
              width: "20rem", // Adjust wrapper width based on scaled size
              height: "30rem", // Adjust wrapper height based on scaled size
            }}
          > */}
            <Viewer fileUrl="assets/sample.pdf" />
          {/* </div> */}

          {startX !== null && startY !== null && endX !== null && endY !== null && (
            <div
              style={{
                position: "absolute",
                left: startX,
                top: startY,
                width: Math.abs(endX - startX),
                height: Math.abs(endY - startY),
                border: "2px solid black",
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};
