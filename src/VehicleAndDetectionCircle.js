import React from 'react';
import VehicleIcon from './VehicleIcon'; 
import './VehicleAndDetectionCircle.css';


function DetectionCircle({ detectionPixel }) {
    const padding = 10; // 余白のサイズ
    const svgSize = detectionPixel * 2 + padding * 2; // 余白を考慮したSVGのサイズ

    return (
        <svg width={svgSize} height={svgSize} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
            <circle
                cx={detectionPixel + padding} // 余白を考慮した円の中心のX座標
                cy={detectionPixel + padding} // 余白を考慮した円の中心のY座標
                r={detectionPixel}
                fill="#00FF85" 
                fillOpacity="0.35" 
                stroke="#00FF38" 
                strokeWidth="2" 
                strokeDasharray="2 2" 
            />
        </svg>
    );
}


function VehicleAndDetectionCircle({ detectionDistance }) {
    const mapScale = 50 / 100; // 60 pixels represents 100 meters
    const detectionPixel = detectionDistance * mapScale *2; // detectionDistanceをピクセル値に変換

    return (
        <div style={{ position: 'relative' }}>
            <VehicleIcon style={{ zIndex: 2 }} /> {/* style propを適用 */}
            <DetectionCircle detectionPixel={detectionPixel} />
        </div>
    );
}



export default VehicleAndDetectionCircle;
