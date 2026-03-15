import React from 'react';
import { GripVertical } from 'lucide-react';

const ProfileCard = ({ profile, isDragging, dragHandleProps }) => {
  const { listeners, attributes } = dragHandleProps || {};

  return (
    <div
      className={`p-4 shadow-md transition-transform duration-300 ${isDragging ? 'shadow-xl' : 'hover:shadow-lg'}`}
      style={{
        ...profile.style,
        borderRadius: '3px',
        color: '#f6efe6',
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        width: profile.name === 'Eve' ? '408px' : '200px',
        minWidth: '200px',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid rgba(212,164,94,0.24)',
      }}
    >
      {/* Drag handle is isolated so the card content remains clickable without starting a drag. */}
      <div
        {...listeners}
        {...attributes}
        className="absolute top-2 right-2 p-1 cursor-grab active:cursor-grabbing text-[#c8b39a] hover:text-[#f6efe6]"
      >
        <GripVertical size={18} />
      </div>

      <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full mx-auto mb-3" draggable={false} />
      <h3 className="text-lg font-semibold text-center text-[#f6efe6]">{profile.name}</h3>
      <p className="text-sm text-[#d4c4b3] text-center">{profile.bio}</p>
    </div>
  );
};

export default ProfileCard;
