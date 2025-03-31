// SortableItem.jsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  // Clone the child and inject the necessary props
  const child = React.cloneElement(children, {
    isDragging,
    dragHandleProps: { listeners, attributes },
  });

  return (
    <div ref={setNodeRef} style={style}>
      {child}
    </div>
  );
};

export default SortableItem;