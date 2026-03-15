import React, { useEffect, useState } from 'react';
import cardsObj from './CardsObj';
import styles from './Expand.module.css';

export default function Expand() {
  const [images] = useState(cardsObj);
  const [activeId, setActiveId] = useState(cardsObj[0]?.id ?? null);

  useEffect(() => {
    if (!activeId && images[0]) {
      setActiveId(images[0].id);
    }
  }, [activeId, images]);

  return (
    <div className={styles.root}>
      <section className={styles.headerCard}>
        <p style={{ margin: 0, color: "rgba(245, 239, 232, 0.78)" }}>Open one panel at a time to compare how the gallery expands focus around the active story card.</p>
      </section>
      <div className={styles.container}>
      {images.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            type="button"
            className={`${styles.content} ${isActive ? styles.active : ''}`}
            style={{ backgroundImage: `url(${item.image})` }}
            key={item.id}
            onClick={() => setActiveId(item.id)}
          >
            <span className={`${styles.text} ${isActive ? styles.activeText : ''}`}>{item.txt}</span>
          </button>
        );
      })}
      </div>
    </div>
  );
}
