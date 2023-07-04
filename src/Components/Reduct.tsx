import React, { useRef, useEffect } from 'react';

interface CanvasProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageWithCanvasProps {
  imageSrc: string;
  canvasWidth: number;
  canvasHeight: number;
  canvases: CanvasProps[];
}

const ImageWithCanvas: React.FC<ImageWithCanvasProps> = ({
  imageSrc,
  canvasWidth,
  canvasHeight,
  canvases,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      // Draw the image on the canvas
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Apply white backgrounds on multiple canvases
      ctx.fillStyle = 'white';
      for (const { x, y, width, height } of canvases) {
        ctx.fillRect(x, y, width, height);
      }
    };
  }, [imageSrc, canvases]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
    />
  );
};

export default ImageWithCanvas;
