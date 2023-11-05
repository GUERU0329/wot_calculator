import React from 'react';

function CustomCircle({ detectionDistance, scale }) {
  const radius = detectionDistance * scale;
  const width = radius * 2 + 2; // 2 is for stroke width
  const height = radius * 2 + 2; // 2 is for stroke width

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <circle 
        cx={width / 2} 
        cy={height / 2} 
        r={radius} 
        fill="#00FF85" 
        fillOpacity="0.35" 
        stroke="#00FF38" 
        strokeWidth="2" 
        strokeDasharray="2 2" 
      />
    </svg>
  );
}

export default CustomCircle;
