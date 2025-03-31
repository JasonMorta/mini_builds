// MasonryGrid.jsx
import React, { useState } from "react";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import ProfileCard from "./ProfileCard";

const initialProfiles = [
  { id: "1", name: "Alice", avatar: "https://i.pravatar.cc/100?img=1", bio: "Web Developer", style: { backgroundColor: "#f8e8ee" } },
  { id: "2", name: "Bob", avatar: "https://i.pravatar.cc/100?img=2", bio: "Graphic Designer", style: { backgroundColor: "#e8f4f8" } },
  { id: "3", name: "Charlie", avatar: "https://i.pravatar.cc/100?img=3", bio: "Product Manager", style: { backgroundColor: "#fff4e6" } },
  { id: "4", name: "David", avatar: "https://i.pravatar.cc/100?img=4", bio: "Data Analyst", style: { backgroundColor: "#eef8e8" } },
  { id: "5", name: "Eve", avatar: "https://i.pravatar.cc/100?img=5", bio: "UX Researcher", style: { backgroundColor: "#e8e8f8" } },
  { id: "6", name: "Frank", avatar: "https://i.pravatar.cc/100?img=6", bio: "Mobile Developer", style: { backgroundColor: "#f8efe8" } },
  { id: "7", name: "Grace", avatar: "https://i.pravatar.cc/100?img=7", bio: "Cybersecurity Expert", style: { backgroundColor: "#f8e8f4" } },
  { id: "8", name: "Hank", avatar: "https://i.pravatar.cc/100?img=8", bio: "Backend Engineer", style: { backgroundColor: "#e8f8e4" } },
  { id: "9", name: "Ivy", avatar: "https://i.pravatar.cc/100?img=9", bio: "AI Engineer", style: { backgroundColor: "#f4e8f8" } },
  { id: "10", name: "Jack", avatar: "https://i.pravatar.cc/100?img=10", bio: "Tech Lead", style: { backgroundColor: "#e8f8f8" } }
];

const MasonryGrid = () => {
  const [profiles, setProfiles] = useState(() => {
    const savedProfiles = localStorage.getItem("profilesOrder");
    return savedProfiles ? JSON.parse(savedProfiles) : initialProfiles;
  });

  // Configure sensors for mouse/touch and keyboard
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Start dragging after moving 8px
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;

    setProfiles((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      
      const newOrder = arrayMove(items, oldIndex, newIndex);
      localStorage.setItem("profilesOrder", JSON.stringify(newOrder));
      return newOrder;
    });
  };

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={profiles.map(profile => profile.id)}
        strategy={rectSortingStrategy}
      >
        <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          flexDirection: "row",
        }}>
          {profiles.map((profile) => (
            <SortableItem key={profile.id} id={profile.id}>
              <ProfileCard profile={profile} />
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default MasonryGrid;