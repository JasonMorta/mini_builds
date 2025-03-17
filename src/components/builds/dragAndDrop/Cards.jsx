import React from "react";

export default function Cards({ data }) {
  return (
    <div className="grid">
      {data.map((card) => (
        <div
          key={card.id} // Fixed key property to use `card.id`
          className="card"
          style={{
            background: card.color,
          }}
          data-id={card.id} // Ensure data-id is set for Packery
        >
          {card.id}
        </div>
      ))}
    </div>
  );
}
