// pages/rooms/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RoomDTO } from "@/types/roomDTO";
import { CustomButton } from "@/components/CustomButton";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Role } from "@/types/userDTO";
import httpClient from "@/utils/httpClient";
import RoomReservationForm from "@/components/RoomReservation";

const RoomsPage = () => {
  const [rooms, setRooms] = useState<RoomDTO[]>([]);
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await httpClient(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms`,
          "GET",
          null,
          currentUser // Pass currentUser
        );
        setRooms(data);
      } catch (error) {
        console.log("Error fetching rooms:", (error as Record<string, string>).message);
      }
    };

    fetchRooms();
  }, [currentUser]);

  const handleDelete = async (id: number) => {
    try {
      await httpClient(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms/${id}`,
        "DELETE",
        null,
        currentUser // Pass currentUser
      );
      setRooms(rooms.filter((room) => room.id !== id));
    } catch (error) {
      console.log("Error deleting room:", (error as Record<string, string>).message);
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
      <RoomReservationForm />
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
