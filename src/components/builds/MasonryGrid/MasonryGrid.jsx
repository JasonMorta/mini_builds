import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import ProfileCard from './ProfileCard';

const initialProfiles = [
  { id: '1', name: 'Alice', avatar: 'https://i.pravatar.cc/100?img=1', bio: 'Web Developer', style: { backgroundColor: 'rgba(52, 37, 28, 0.96)' } },
  { id: '2', name: 'Bob', avatar: 'https://i.pravatar.cc/100?img=2', bio: 'Graphic Designer', style: { backgroundColor: 'rgba(42, 31, 23, 0.96)' } },
  { id: '3', name: 'Charlie', avatar: 'https://i.pravatar.cc/100?img=3', bio: 'Product Manager', style: { backgroundColor: 'rgba(64, 45, 31, 0.96)' } },
  { id: '4', name: 'David', avatar: 'https://i.pravatar.cc/100?img=4', bio: 'Data Analyst', style: { backgroundColor: 'rgba(47, 37, 26, 0.96)' } },
  { id: '5', name: 'Eve', avatar: 'https://i.pravatar.cc/100?img=5', bio: 'UX Researcher', style: { backgroundColor: 'rgba(49, 34, 30, 0.96)' } },
  { id: '6', name: 'Frank', avatar: 'https://i.pravatar.cc/100?img=6', bio: 'Mobile Developer', style: { backgroundColor: 'rgba(58, 42, 31, 0.96)' } },
  { id: '7', name: 'Grace', avatar: 'https://i.pravatar.cc/100?img=7', bio: 'Cybersecurity Expert', style: { backgroundColor: 'rgba(55, 34, 39, 0.96)' } },
  { id: '8', name: 'Hank', avatar: 'https://i.pravatar.cc/100?img=8', bio: 'Backend Engineer', style: { backgroundColor: 'rgba(39, 37, 24, 0.96)' } },
  { id: '9', name: 'Ivy', avatar: 'https://i.pravatar.cc/100?img=9', bio: 'AI Engineer', style: { backgroundColor: 'rgba(47, 34, 49, 0.96)' } },
  { id: '10', name: 'Jack', avatar: 'https://i.pravatar.cc/100?img=10', bio: 'Tech Lead', style: { backgroundColor: 'rgba(35, 43, 43, 0.96)' } },
];

const MasonryGrid = () => {
  const [profiles, setProfiles] = useState(() => {
    const savedProfiles = localStorage.getItem('profilesOrder');
    return savedProfiles ? JSON.parse(savedProfiles) : initialProfiles;
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setProfiles((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newOrder = arrayMove(items, oldIndex, newIndex);
      localStorage.setItem('profilesOrder', JSON.stringify(newOrder));
      return newOrder;
    });
  };

  return (
    <div style={{ display: 'grid', gap: '1rem', width: 'min(100%, 980px)', margin: '0 auto' }}>
      <p style={{ margin: 0, opacity: 0.8, color: 'rgba(246, 239, 230, 0.82)' }}>Drag cards to change the grid order. The current order is stored in local storage.</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={profiles.map((profile) => profile.id)} strategy={rectSortingStrategy}>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-start',
              alignContent: 'flex-start',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
            }}
          >
            {profiles.map((profile) => (
              <SortableItem key={profile.id} id={profile.id}>
                <ProfileCard profile={profile} />
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default MasonryGrid;
