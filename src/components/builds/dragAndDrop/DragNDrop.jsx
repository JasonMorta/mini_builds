import React, { useEffect, useRef } from 'react';
import Packery from 'packery';
import Draggabilly from 'draggabilly';
import styles from './DragNDrop.module.css';

const gridItems = [
  { id: 1, image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/orange-tree.jpg', value: 23 },
  { id: 2, image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/submerged.jpg', value: 55 },
  { id: 3, image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/look-out.jpg', value: 2 },
  { id: 4, image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/one-world-trade.jpg', value: 88 },
  { id: 5, image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/drizzle.jpg', value: 54 },
  { id: 6, image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/golden-hour.jpg', value: 12 },
  { id: 7, image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/cat-nose.jpg', value: 89 },
  { id: 8, image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/contrail.jpg', value: 122 },
  { id: 9, image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/flight-formation.jpg', value: 57 },
];

const DragNDrop = () => {
  const gridRef = useRef(null);
  const gutter = 5;

  useEffect(() => {
    if (!Packery.prototype.getShiftPositions) {
      Packery.prototype.getShiftPositions = function (attrName = 'id') {
        return this.items.map((item) => ({
          attr: item.element.getAttribute(attrName),
          x: item.rect.x / this.packer.width,
        }));
      };
    }

    if (!Packery.prototype.initShiftLayout) {
      Packery.prototype.initShiftLayout = function (positions, attr = 'id') {
        if (!positions) {
          this.layout();
          return;
        }

        if (typeof positions === 'string') {
          try {
            positions = JSON.parse(positions);
          } catch (error) {
            this.layout();
            return;
          }
        }

        this._resetLayout();
        this.items = positions.map((itemPosition) => {
          const selector = `[${attr}="${itemPosition.attr}"]`;
          const itemElem = this.element.querySelector(selector);
          const item = this.getItem(itemElem);
          item.rect.x = itemPosition.x * this.packer.width;
          return item;
        });

        this.shiftLayout();
      };
    }

    const grid = gridRef.current;
    const packery = new Packery(grid, {
      itemSelector: '.grid-item',
      gutter: 4,
      columnWidth: 2,
      rowHeight: 2,
      horizontal: false,
      percentPosition: true,
      initLayout: false,
    });

    const savedPositions = localStorage.getItem('dragPositions');
    if (savedPositions) {
      packery.initShiftLayout(savedPositions, 'data-item-id');
    } else {
      packery.layout();
    }

    grid.querySelectorAll('.grid-item').forEach((itemElem) => {
      const draggie = new Draggabilly(itemElem);
      packery.bindDraggabillyEvents(draggie);
    });

    // Persist positions so the visual order survives refreshes.
    packery.on('dragItemPositioned', () => {
      const positions = packery.getShiftPositions('data-item-id');
      localStorage.setItem('dragPositions', JSON.stringify(positions));
    });
  }, []);

  return (
    <div className={styles.dragGridBuild}>
      <section className="drag-grid-build__intro build-card">
        <h3 style={{ marginTop: 0 }}>Packery drag grid</h3>
        <p style={{ marginBottom: 0 }}>
          Drag cards around and refresh to see the saved order restored from local storage.
        </p>
      </section>
      <section className="drag-grid-build__surface build-card">
        <div ref={gridRef} className={`${styles.dragGrid}`} style={{ maxWidth: '100%', padding: gutter }}>
          <div className="grid-sizer" style={{ width: '20%' }} />
          {gridItems.map(({ id, image, value }) => (
            <div
              key={id}
              className={`grid-item ${styles.gridItem}`}
              data-item-id={id}
              style={{
                width: id === 2 ? '500px' : '200px',
                height: '200px',
                paddingBottom: '20%',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundImage: `url(${image})`,
              }}
            >
              <p className={styles.gridValue}>{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DragNDrop;
