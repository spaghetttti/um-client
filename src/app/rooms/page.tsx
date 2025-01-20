// pages/rooms/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RoomDTO } from "@/types/roomDTO";

const RoomsPage = () => {
  const [rooms, setRooms] = useState<RoomDTO[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      let data;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms`
        );
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
            className="flex justify-between items-center mb-4"
          >
            <span>{room.roomNumber}</span>
            <div>
              <Link href={`/rooms/${room.id}`}>
                <p className="px-2 py-1 bg-yellow-500 text-white rounded mr-2">
                  Edit
                </p>
              </Link>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDelete(room.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomsPage;