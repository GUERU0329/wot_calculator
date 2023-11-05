import React, { useState, useRef, useCallback } from 'react';
import VehicleAndDetectionCircle from './VehicleAndDetectionCircle';


function DraggableSVG({ detectionDistance }) {
  const [position, setPosition] = useState({ x: 650, y: 300 });
  const isDragging = useRef(false);
  const offsetX = useRef(0);
  const offsetY = useRef(0);

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    const x = e.clientX - offsetX.current;
    const y = e.clientY - offsetY.current;
    setPosition({ x, y });
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  const onMouseDown = useCallback((e) => {
    offsetX.current = e.clientX - position.x;
    offsetY.current = e.clientY - position.y;
    isDragging.current = true;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [position, onMouseMove, onMouseUp]);

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: 'grab'
      }}
    >
        <VehicleAndDetectionCircle detectionDistance={detectionDistance} />
    </div>
  );
}

export default DraggableSVG;
