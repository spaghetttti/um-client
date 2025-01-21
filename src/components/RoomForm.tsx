// components/RoomForm.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RoomDTO } from "@/types/roomDTO";
import httpClient from "@/utils/httpClient";
import { useAuth } from "@/context/AuthContext";

interface RoomFormProps {
  room?: RoomDTO;
}

const RoomForm: React.FC<RoomFormProps> = ({ room }) => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [roomNumber, setRoomNumber] = useState(room?.roomNumber || "");
  const [capacity, setCapacity] = useState(room?.capacity || "");
  const [type, setType] = useState(room?.type || "");
  const [accessible, setAccessible] = useState(room?.accessible || false);
  const [floor, setFloor] = useState(room?.floor || "");
  const [buildingId, setBuildingId] = useState<number | "">(
    room?.buildingId || ""
  );
  const [availableBuildings, setAvailableBuildings] = useState<
    { id: number; code: string }[]
  >([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const data = await httpClient(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings`,
          "GET",
          null,
          currentUser // Pass currentUser
        );
        setAvailableBuildings(data);
      } catch (error) {
        console.log("Error fetching buildings:", error);
      }
    };

    fetchBuildings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const roomData = {
      roomNumber,
      capacity,
      type,
      accessible,
      floor,
      buildingId,
    };

    const url = room
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms/${room.id}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms`;
    const method = room ? "PUT" : "POST";

    try {
      await httpClient(url, method, roomData, currentUser); // Pass currentUser
      router.push("/rooms");
    } catch (error) {
      alert(`Error saving room: ${(error as Record<string, string>).message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Room Number</label>
        <input
          type="text"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block">Capacity</label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block">Type</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block">Accessible</label>
        <input
          type="checkbox"
          checked={accessible}
          onChange={(e) => setAccessible(e.target.checked)}
          className="mr-2"
        />
      </div>
      <div>
        <label className="block">Floor</label>
        <input
          type="number"
          value={floor}
          onChange={(e) => setFloor(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block">Building</label>
        <select
          value={buildingId}
          onChange={(e) => setBuildingId(Number(e.target.value))}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a building</option>
          {availableBuildings.map((building) => (
            <option key={building.id} value={building.id}>
              {building.code}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {room ? "Update Room" : "Create Room"}
        </button>
      </div>
    </form>
  );
};

export default RoomForm;
