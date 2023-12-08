import React from 'react';
import Draggable from './DraggableSVG';
import VehicleAndDetectionCircle from './VehicleAndDetectionCircle';
import './MapComponent.css';

const mapsConfig = [
    {
        name: 'マリノフカ',
        imageUrl: process.env.PUBLIC_URL + '/Maps/マリノフカ-min.png',
        scale: 608 / 1000, 
      },
    {
      name: 'プロホロフカ',
      imageUrl: process.env.PUBLIC_URL + '/Maps/プロホロフカ-min.png',
      scale: 608 / 1000,
    },
  {
    name: 'のどかな海岸',
    imageUrl: process.env.PUBLIC_URL + '/Maps/のどかな海岸-min.png', 
    scale: 608 / 1000,
  },
  {
    name: 'ジークフリート線',
    imageUrl: process.env.PUBLIC_URL + '/Maps/ジークフリート線-min.png', 
    scale: 608 / 1000,
  },  {
    name: 'ウェストフィールド',
    imageUrl: process.env.PUBLIC_URL + '/Maps/ウェストフィールド-min.png', 
    scale: 608 / 1000,
  },
  {
    name: 'ムロヴァンカ',
    imageUrl: process.env.PUBLIC_URL + '/Maps/ムロヴァンカ-min.png', 
    scale: 608 / 1000,
  },
  {
    name: '漁師の港',
    imageUrl: process.env.PUBLIC_URL + '/Maps/漁師の港-min.png', 
    scale: 608 / 1000,
  },
  {
    name: '高速道路',
    imageUrl: process.env.PUBLIC_URL + '/Maps/高速道路-min.png', 
    scale: 608 / 1000,
  },
  {
    name: 'ゴーストタウン',
    imageUrl: process.env.PUBLIC_URL + '/Maps/ゴーストタウン-min.png', 
    scale: 608 / 1000,
  },
  {
    name: 'フィヨルド',
    imageUrl: process.env.PUBLIC_URL + '/Maps/フィヨルド-min.png', 
    scale: 608 / 1000,
  },
  {
    name: '修道院',
    imageUrl: process.env.PUBLIC_URL + '/Maps/修道院-min.png', 
    scale: 608 / 1000,
  },
  {
    name: '飛行場',
    imageUrl: process.env.PUBLIC_URL + '/Maps/飛行場-min.png', 
    scale: 608 / 1000,
  },
  {
    name: '帝国境界線',
    imageUrl: process.env.PUBLIC_URL + '/Maps/帝国境界線-min.png', 
    scale: 608 / 1000,
  },
  {
    name: 'エルハルフ',
    imageUrl: process.env.PUBLIC_URL + '/Maps/エルハルフ-min.png', 
    scale: 608 / 1000,
  },
  {
    name: '湖の村',
    imageUrl: process.env.PUBLIC_URL + '/Maps/湖の村-min.png', 
    scale: 608 / 800,
  },
  {
    name: 'パリ',
    imageUrl: process.env.PUBLIC_URL + '/Maps/パリ-min.png', 
    scale: 608 / 800,
  },    
  {
    name: 'ヒメルズドルフ',
    imageUrl: process.env.PUBLIC_URL + '/Maps/ヒメルズドルフ-min.png', 
    scale: 608 / 700,
  },
  {
    name: 'エンスク',
    imageUrl: process.env.PUBLIC_URL + '/Maps/エンスク-min.png', 
    scale: 608 / 600,
  },

  ];
  

  function MapComponent({ mapName, detectionDistance }) {
    const mapConfig = mapsConfig.find(map => map.name === mapName) || mapsConfig[0];
    
    const detectionPixel = detectionDistance * mapConfig.scale;
    
    return (
      <div style={{ position: 'relative' }}>
        <img src={mapConfig.imageUrl} alt="map" draggable="false" />       
        <Draggable detectionDistance={detectionPixel}>
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <VehicleAndDetectionCircle detectionDistance={detectionPixel} />
        </div>
        </Draggable>
      </div>
    );
  }
  
  export default MapComponent;