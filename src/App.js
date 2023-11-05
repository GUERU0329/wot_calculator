import React, { useState, useEffect  } from 'react';
import MapComponent from './MapComponent'; // MapComponentのパスを正しく指定してください
import './App.css';

// Control Panel for input values
function ControlPanel({ onInputChange }) {
  return (
    <div>
      <input className="input-field" type="number" placeholder="自車両の視界範囲" onChange={(e) => onInputChange('viewRange', e.target.value)} />
      <input className="input-field" type="number" placeholder="敵車両の隠蔽率(%)" onChange={(e) => onInputChange('concealment', e.target.value)} />
      <input className="input-field" type="number" placeholder="茂みの数" onChange={(e) => onInputChange('bushCount', e.target.value)} />
    </div>
  );
}

function MapSelector({ maps, onMapSelect }) {
  return (
    <div className="select-container">
      <select className="select-field" onChange={(e) => onMapSelect(e.target.value)}>
        {maps.map((map, index) => (
          <option key={index} value={map.name}>
            {map.name}
          </option>
        ))}
      </select>
    </div>
  );
}


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
    },  
    {
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


function App() {
  const [viewRange, setViewRange] = useState(0);
  const [concealment, setConcealment] = useState(0);
  const [bushCount, setBushCount] = useState(0);
  const [detectionDistance, setDetectionDistance] = useState(null);

  const [selectedMapName, setSelectedMapName] = useState('Prokhorovka');

  const handleInputChange = (field, value) => {
    if (field === 'viewRange') setViewRange(value);
    if (field === 'concealment') setConcealment(value / 100); // percentage to decimal
    if (field === 'bushCount') setBushCount(value);
  };

  useEffect(() => {
    let bushEffect = bushCount * 0.25;
    bushEffect = bushEffect > 0.8 ? 0.8 : bushEffect; // Max bush effect capped at 80%
    const totalConcealment = concealment + bushEffect;
    let calculatedDetectionDistance = viewRange - ((viewRange - 50) * totalConcealment);

    // Ensure that the detection distance does not exceed 455 meters
    calculatedDetectionDistance = calculatedDetectionDistance > 455 ? 455 : calculatedDetectionDistance;
    
    setDetectionDistance(calculatedDetectionDistance);
  }, [viewRange, concealment, bushCount]);


  return (
    <div className="App">
      <div className='text'>
        WoT発見距離計算機
      </div>
      <ControlPanel className="panel" onInputChange={handleInputChange} />
      <div className='text'>
        発見距離: {detectionDistance}m
      </div>
      <MapSelector maps={mapsConfig} onMapSelect={setSelectedMapName} />
      <div>
      <MapComponent mapName={selectedMapName} detectionDistance={detectionDistance} />
      </div>
      <div className='text2'>※著作権法第32条に基づき画像を引用し、著作権は権利者様へ帰属します。権利者様側からの画像等の削除の依頼や警告には速やかに対処いたします。
      </div>
    </div>
  );
}

export default App;