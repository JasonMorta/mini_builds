import React, { useState, useRef, useEffect } from 'react';
import { useSprings, animated } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import clamp from 'lodash.clamp';
import swap from 'lodash-move';

import styles from './styles.module.css';

// Function to define the spring animation properties
// Based on whether an item is being dragged or not
const getSpringProps = (order, active = false, originalIndex = 0, curIndex = 0, y = 0) => (index) =>
  active && index === originalIndex
    ? {
        y: curIndex * 50 + y,  // Calculate the Y position dynamically during dragging
        scale: 1.1,            // Slightly scale up the item being dragged
        zIndex: 1,             // Bring the dragged item to the front
        shadow: 15,            // Increase shadow for emphasis
        immediate: (key) => key === 'y' || key === 'zIndex',  // Update Y position and zIndex immediately during drag
      }
    : {
        y: order.indexOf(index) * 50,  // Set the Y position based on the item order
        scale: 1,                      // Keep the scale normal
        zIndex: 0,                     // Default zIndex for non-dragged items
        shadow: 1,                     // Default shadow for non-dragged items
        immediate: false,              // Do not immediately update during normal transitions
      };

function DraggableList({ items }) {
  const [editMode, setEditMode] = useState(false); // Track whether the list is in edit mode
  const [localItems, setLocalItems] = useState(items); // Manage the list items' text locally
  const order = useRef(items.map((_, index) => index)); // Store indices representing the item order
  const [springs, api] = useSprings(localItems.length, getSpringProps(order.current)); // Create springs for animation
  const containerRef = useRef(null); // Reference for the container

  // Load saved items and positions from localStorage when the component mounts
  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem('order')); // Get saved order from localStorage
    const savedItems = JSON.parse(localStorage.getItem('items')); // Get saved items from localStorage
    if (savedOrder && savedItems) {
      order.current = savedOrder; // Update order with saved data
      setLocalItems(savedItems);  // Update items with saved data
      api.start(getSpringProps(order.current)); // Start the animation with the saved order
    }
  }, [api]);

  // Bind the drag event handler
  const bind = useDrag(
    ({ args: [originalIndex], active, movement: [, y] }) => {
      if (!editMode) return; // Only allow dragging when in edit mode
      const curIndex = order.current.indexOf(originalIndex); // Get the current index of the item being dragged
      const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, localItems.length - 1); // Determine the target row based on movement
      const newOrder = swap(order.current, curIndex, curRow); // Swap the items in the order array
      api.start(getSpringProps(newOrder, active, originalIndex, curIndex, y)); // Update springs with new order
      if (!active) {
        order.current = newOrder; // Update the order once dragging ends
        localStorage.setItem('order', JSON.stringify(order.current)); // Save the new order to localStorage
      }
    },
    { filterTaps: true }
  );

  // Handle text editing for individual items
  const handleEdit = (index) => (e) => {
    const updatedItems = [...localItems];
    updatedItems[index] = e.target.value; // Update the specific item's text
    setLocalItems(updatedItems); // Set the updated items in state
  };

  // Toggle between edit and view modes
  const toggleEditMode = () => {
    if (editMode) {
      // Save updated items and positions to localStorage
      localStorage.setItem('items', JSON.stringify(localItems));
    }
    setEditMode(!editMode); // Toggle edit mode state
  };

  return (
    <div>
      <button onClick={toggleEditMode} className={styles.editButton}>
        {editMode ? 'Save' : 'Edit'}
      </button>
      <div className={styles.content} style={{ height: localItems.length * 50 }}>
        {localItems.map((item, i) => (
          <animated.div
            {...bind(i)}  // Bind drag events to each item
            key={i}
            style={{
              width: `${i === 2 ? '100px' : '200px'}`,  // Example conditional styling for item width
              zIndex: springs[i].zIndex,
              boxShadow: springs[i].shadow.to((s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`), // Dynamic shadow based on spring value
              y: springs[i].y,  // Y position controlled by the spring
              scale: springs[i].scale,  // Scale controlled by the spring
              cursor: editMode ? 'grab' : 'default',  // Change cursor to indicate draggable state
            }}
            ref={containerRef}
          >
            {editMode ? (
              <input value={item} onChange={handleEdit(i)} style={{ width: '100%' }} />  // Editable input in edit mode
            ) : (
              <span>{item}</span>  // Display text in view mode
            )}
          </animated.div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className={styles.container}>
      <DraggableList items={'Lorem ipsum dolor sit'.split(' ')} />
    </div>
  );
}
