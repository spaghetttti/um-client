// pages/rooms/[id].tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RoomDTO } from "@/types/roomDTO";
import RoomForm from "@/components/RoomForm";
import AuthGuard from "@/app/auth/AuthGuard";

const EditRoomPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState<RoomDTO | null>(null);

  useEffect(() => {
    if (id) {
      const fetchRoom = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms/${id}`
        );
        const data = await res.json();
        setRoom(data);
      };
      fetchRoom();
    }
  }, [id]);

  return (
    <AuthGuard allowedRoles={["ADMINISTRATOR", "MANAGER"]}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Edit Room</h1>
        {room && <RoomForm room={room} />}
      </div>
    </AuthGuard>
  );
};

export default EditRoomPage;
