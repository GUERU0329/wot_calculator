import React, { useState, useEffect  } from 'react';
import MapComponent from './MapComponent'; 
import './App.css';

function ControlPanel({ onInputChange, onEquipmentChange, onMovementChange  }) {
  return (
<div>
  <input className="input-field" type="number" placeholder="自車両の視界範囲" onChange={(e) => onInputChange('viewRange', e.target.value)} />
  <input className="input-field" type="number" placeholder="敵車両の隠蔽率(%)" onChange={(e) => onInputChange('concealment', e.target.value)} />
  <select className="input-field" onChange={(e) => onInputChange('bushCount', e.target.value)}>
        <option value="0">草むら隠蔽効果</option>
        <option value="1">25%</option>
        <option value="2">50%</option>
        <option value="3">75%</option>
        <option value="4">80%</option>
        </select>
  <div className="checkbox-container">
    <input
      type="checkbox"
      id="movementMoving"
      onChange={(e) => onMovementChange(e.target.checked)}
    />
    <label htmlFor="movementMoving">敵車両移動中　</label>
  <select className="select-field select-field-equipment" onChange={(e) => onEquipmentChange('commanderEquipmentType', e.target.value)}>
          <option value="none">車長用視認性向上装置</option>
          <option value="10-15">移動中隠蔽率10%減少/草むら隠蔽ボーナス15%減少</option>
          <option value="12.5-20">移動中隠蔽率12.5%移動中/草むら隠蔽ボーナス20%減少</option>
        </select>
    </div>
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
  const [enemyMovement, setEnemyMovement] = useState('stationary');
  const [viewRange, setViewRange] = useState(0);
  const [concealment, setConcealment] = useState(0);
  const [bushCount, setBushCount] = useState(0);
  const [detectionDistance, setDetectionDistance] = useState(null);

  const [selectedMapName, setSelectedMapName] = useState('Prokhorovka');

  const handleInputChange = (field, value) => {
    if (field === 'viewRange') setViewRange(value);
    if (field === 'concealment') setConcealment(value / 100); 
    if (field === 'bushCount') setBushCount(value);
  };
  const [commanderEquipmentType, setCommanderEquipmentType] = useState('none');
// handleEquipmentChange 関数の外に handleMovementChange 関数を移動
const handleMovementChange = (isMoving) => {
  setEnemyMovement(isMoving ? 'moving' : 'stationary');
};

// handleEquipmentChange 関数
const handleEquipmentChange = (field, value) => {
  if (field === 'commanderEquipmentType') setCommanderEquipmentType(value);
};
  

  useEffect(() => {
    const equipmentEffect = commanderEquipmentType === '10-15' ? 0.1 : (commanderEquipmentType === '12.5-20' ? 0.125 : 0);
    const bushEffectReduction = commanderEquipmentType === '10-15' ? 0.15 : (commanderEquipmentType === '12.5-20' ? 0.20 : 0);
  
    let effectiveConcealment = concealment;
    if (commanderEquipmentType !== 'none' && enemyMovement === 'moving') {
      effectiveConcealment -= concealment * equipmentEffect;
    }
    effectiveConcealment = Math.max(0, effectiveConcealment);
  
    let bushEffect = bushCount * 0.25 - bushCount * 0.25 * bushEffectReduction;
    bushEffect = Math.max(0, bushEffect);
    bushEffect = bushEffect > 0.8 ? 0.8 : bushEffect;
  
    const totalConcealment = effectiveConcealment + bushEffect;
    let calculatedDetectionDistance = viewRange - ((viewRange - 50) * totalConcealment);
  
    if (viewRange <= 50 || viewRange === 0) {
      calculatedDetectionDistance = Math.max(0, calculatedDetectionDistance);
    } else {
      calculatedDetectionDistance = Math.max(50, calculatedDetectionDistance);
    }
  
    calculatedDetectionDistance = Math.min(445, calculatedDetectionDistance);
    
    setDetectionDistance(calculatedDetectionDistance);
  }, [viewRange, concealment, bushCount, commanderEquipmentType, enemyMovement]);
  
  


  return (
    <div className="App">
      <div className='text'>
        WoT発見距離計算機
      </div>
      <ControlPanel 
  className="panel" 
  onInputChange={handleInputChange} 
  onEquipmentChange={handleEquipmentChange} 
  onMovementChange={handleMovementChange} // この行を確認
/>

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