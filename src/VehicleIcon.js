import React from 'react';

function VehicleIcon({ style }) {
    return (
      <div style={{ ...style, position: 'absolute', transform: 'translate(-50%, -50%)' }}>
        <svg height={30} viewBox="0 0 266 292" fill="none">
  <rect  />
  <path d="M0 146L133 0L266 146L133 292L0 146Z" fill="url(#paint0_linear_0_1)" />
  <path d="M185 71L133 14L13 146L68.5 207L185 71Z" fill="url(#paint1_linear_0_1)" />
  <path d="M253 146L195 82L79 218.5L133 277L253 146Z" fill="url(#paint2_linear_0_1)" />
  <defs>
    <linearGradient id="paint0_linear_0_1" x1={133} y1={0} x2={133} y2={292} gradientUnits="userSpaceOnUse">
      <stop />
      <stop offset="0.490129" stopColor="#424242" />
      <stop offset={1} />
    </linearGradient>
    <linearGradient id="paint1_linear_0_1" x1="160.5" y1="44.5" x2="39.5" y2={175} gradientUnits="userSpaceOnUse">
      <stop stopColor="#7CB803" />
      <stop offset="0.504502" stopColor="#AF0" />
      <stop offset="0.979008" stopColor="#7CB803" />
    </linearGradient>
    <linearGradient id="paint2_linear_0_1" x1="223.5" y1="113.5" x2="102.5" y2={244} gradientUnits="userSpaceOnUse">
      <stop stopColor="#7CB803" />
      <stop offset="0.504502" stopColor="#AF0" />
      <stop offset="0.979008" stopColor="#7CB803" />
    </linearGradient>
  </defs>
</svg>
    </div>
  );
}

export default VehicleIcon;
