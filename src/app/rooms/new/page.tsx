// pages/rooms/new.tsx
"use client";
import AuthGuard from "@/app/auth/AuthGuard";
import RoomForm from "@/components/RoomForm";

const NewRoomPage = () => {
  return (
    <AuthGuard allowedRoles={["ADMINISTRATOR", "MANAGER"]}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Create New Room</h1>
        <RoomForm />
      </div>
    </AuthGuard>
  );
};

export default NewRoomPage;
