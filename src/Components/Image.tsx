import React, { useRef, useState } from 'react';

interface ImageAreaSelectorProps {
  imageUrl: string;
}

interface Area {
  startX: number | null;
  startY: number | null;
  endX: number | null;
  endY: number | null;
}

const ImageAreaSelector: React.FC<ImageAreaSelectorProps> = ({ imageUrl }) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [selectedArea, setSelectedArea] = useState<Area>({
    startX: null,
    startY: null,
    endX: null,
    endY: null,
  });
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [zoomedArea, setZoomedArea] = useState<Area | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
    if (event.button === 0) {
      // Left mouse button is pressed
      setIsSelecting(true);

      const { clientX, clientY } = event;
      const { left, top } = event.currentTarget.getBoundingClientRect();

      setSelectedArea({
        startX: clientX - left,
        startY: clientY - top,
        endX: null,
        endY: null,
      });
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    if (isSelecting && selectedArea.startX !== null && selectedArea.startY !== null) {
      const { clientX, clientY } = event;
      const { left, top } = event.currentTarget.getBoundingClientRect();

      setSelectedArea((prevArea) => ({
        ...prevArea,
        endX: clientX - left,
        endY: clientY - top,
      }));
    }

    if (isZoomed && dragStartPos) {
      const { clientX, clientY } = event;
      const offsetX = clientX - dragStartPos.x;
      const offsetY = clientY - dragStartPos.y;

      setDragOffset({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseUp = () => {
    if (
      isSelecting &&
      selectedArea.startX !== null &&
      selectedArea.startY !== null &&
      selectedArea.endX !== null &&
      selectedArea.endY !== null
    ) {
      // Calculate the zoomed area
      const zoomedAreaWidth = Math.abs(selectedArea.endX - selectedArea.startX);
      const zoomedAreaHeight = Math.abs(selectedArea.endY - selectedArea.startY);

      // Calculate the zoom ratio based on the desired zoom level
      const zoomRatio = 2; // Adjust this value to control the zoom level

      // Calculate the zoomed area coordinates
      const zoomedStartX = selectedArea.startX - zoomedAreaWidth * (zoomRatio - 1) / 2;
      const zoomedStartY = selectedArea.startY - zoomedAreaHeight * (zoomRatio - 1) / 2;
      const zoomedEndX = zoomedStartX + zoomedAreaWidth * zoomRatio;
      const zoomedEndY = zoomedStartY + zoomedAreaHeight * zoomRatio;

      setZoomedArea({
        startX: zoomedStartX,
        startY: zoomedStartY,
        endX: zoomedEndX,
        endY: zoomedEndY,
      });

      setIsZoomed(true);
    }

    setIsSelecting(false);
    setSelectedArea({
      startX: null,
      startY: null,
      endX: null,
      endY: null,
    });
  };

  const handleDoubleClick = () => {
    setIsZoomed(false);
    setZoomedArea(null);
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    setDragStartPos({ x: clientX, y: clientY });
  };

  const handleDragEnd = () => {
    setDragStartPos(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const getZoomStyles = (): React.CSSProperties => {
    if (zoomedArea) {
      const { startX, startY, endX, endY } = zoomedArea;

      return {
        position: 'absolute',
        top: startY !== null ? `${startY + dragOffset.y}px` : 'auto',
        left: startX !== null ? `${startX + dragOffset.x}px` : 'auto',
        width: endX !== null && startX !== null ? `${endX - startX}px` : 'auto',
        height: endY !== null && startY !== null ? `${endY - startY}px` : 'auto',
        // overflow: 'hidden',
        // backgroundImage: `url(${imageUrl})`,
        backgroundPosition: startX !== null && startY !== null ? `-${startX}px -${startY}px` : 'auto',
        backgroundSize: 'cover',
        cursor: 'move',
      };
    }

    return {};
  };

  return (
    <div style={{ position: 'relative' }}>
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Image"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDoubleClick={handleDoubleClick}
        style={{ display: 'block', width: '100%', height: 'auto', cursor: 'crosshair' }}
      />
      {selectedArea.startX !== null &&
        selectedArea.startY !== null &&
        selectedArea.endX !== null &&
        selectedArea.endY !== null && (
          <div
            style={{
              position: 'absolute',
              top: selectedArea.startY,
              left: selectedArea.startX,
              width: selectedArea.endX - selectedArea.startX,
              height: selectedArea.endY - selectedArea.startY,
              border: '2px solid red',
            }}
          />
        )}
      {zoomedArea && (
        <div
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={getZoomStyles()}
        />
      )}
    </div>
  );
};

export default ImageAreaSelector;
