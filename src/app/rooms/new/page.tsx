// pages/rooms/new.tsx
"use client";
import RoomForm from "@/components/RoomForm";

const NewRoomPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Room</h1>
      <RoomForm />
    </div>
  );
};

export default NewRoomPage;