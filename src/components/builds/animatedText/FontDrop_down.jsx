import React from "react";

const animationOptions = [
  "text-pop-up-top",
  "tracking-in-contract-bck-top",
  "text-focus-in",
  "focus-in-expand",
  "roll-in-blurred-left",
];

export default function FontDropDown({ handleClick, value }) {
  return (
    <label style={{ display: 'grid', gap: '0.4rem', width: '100%' }}>
      <span style={{ color: 'rgba(246, 239, 230, 0.82)', fontSize: '0.85rem' }}>Choose animation</span>
      <select value={value} onChange={(event) => handleClick(event)} style={{ minHeight: '44px', padding: '0.75rem 0.9rem' }}>
        {animationOptions.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </label>
  );
}
