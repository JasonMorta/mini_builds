// ProfileCard.jsx
import React from "react";
import { GripVertical } from "lucide-react";

const ProfileCard = ({ profile, isDragging, dragHandleProps }) => {
  console.log('profile', profile)
  const { listeners, attributes } = dragHandleProps || {};

  return (
    <div
      className={` p-4 rounded-lg shadow-md transition-transform duration-300 ${
        isDragging ? "shadow-xl" : " hover:shadow-lg"
      }`}
      //parent width is 1085px

      // Eve is double width and height

      style={{
        ...profile.style,
        borderRadius: "0.5rem",
        transform: isDragging ? "scale(1.05)" : "scale(1)",
        width: profile.name === "Eve" ? "408px" : "200px",
        minWidth: "200px",
        height:  "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Drag Handle */}
      <div
        {...listeners}
        {...attributes}
        className="absolute top-2 right-2 p-1 cursor-grab active:cursor-grabbing text-gray-500 hover:text-black"
      >
        <GripVertical size={18} />
      </div>

      <img
        src={profile.avatar}
        alt={profile.name}
        className="w-16 h-16 rounded-full mx-auto mb-3"
        draggable={false}
      />
      <h3 className="text-lg font-semibold text-center">{profile.name}</h3>
      <p className="text-sm text-gray-500 text-center">{profile.bio}</p>
    </div>
  );
};

export default ProfileCard;