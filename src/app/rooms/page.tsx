// pages/rooms/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RoomDTO } from "@/types/roomDTO";
import { CustomButton } from "@/components/CustomButton";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Role } from "@/types/userDTO";

const RoomsPage = () => {
  const [rooms, setRooms] = useState<RoomDTO[]>([]);
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      let data;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms`);
        data = await res.json();
      } catch (error) {
        console.log(error);
      }
      if (!!data) setRooms(data);
    };

    fetchRooms();
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      setRooms(rooms.filter((room) => room.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Rooms</h1>
      <Link href="/rooms/new">
        <p className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">
          Create New Room
        </p>
      </Link>
      <ul>
        {rooms.map((room) => (
          <li
            key={room.id}
            className="flex justify-between items-center mb-4 px-4 py-2 rounded bg-slate-800"
          >
            <span>{room.roomNumber}</span>
            <div>
              <CustomButton
                disabled={
                  !currentUser || currentUser.role !== Role.ADMINISTRATOR
                }
                onClick={() => router.push(`/rooms/${room.id}`)}
              >
                Edit
              </CustomButton>
              <CustomButton
                bgColor="bg-red-500"
                disabled={
                  !currentUser || currentUser.role !== Role.ADMINISTRATOR
                }
                onClick={() => handleDelete(room.id)}
              >
                Delete
              </CustomButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomsPage;
