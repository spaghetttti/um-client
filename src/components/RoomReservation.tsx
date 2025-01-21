import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import httpClient from "@/utils/httpClient";
import { RoomDTO } from "@/types/roomDTO";

const RoomReservationForm: React.FC = () => {
  const { currentUser } = useAuth();

  const [roomId, setRoomId] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [rooms, setRooms] = useState<RoomDTO[]>([]);
  const [reservations, setReservations] = useState<
    { id: number; startTime: string; endTime: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await httpClient(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms`,
          "GET",
          null,
          currentUser
        );
        setRooms(data);
      } catch (error) {
        console.log("Error fetching rooms:", error);
      }
    };

    const fetchReservations = async () => {
      try {
        const data = await httpClient(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservations`,
          "GET",
          null,
          currentUser
        );
        setReservations(data);
      } catch (error) {
        console.log("Error fetching reservations:", error);
      }
    };

    fetchRooms();
    fetchReservations();
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId || !startTime || !endTime) {
      setError("All fields are required");
      return;
    }

    try {
      const data = await httpClient(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservations`,
        "POST",
        { roomId, startTime, endTime },
        currentUser
      );
      setReservations((prev) => [...prev, data]);
      setError(null); // Clear error on success
    } catch (error) {
      const errorMessage =
        (error as Record<string, string>).error ||
        "An error occurred while creating the reservation.";
      setError(errorMessage);
    }
  };

  return (
    <div className="space-y-6 pb-6">
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
        <h2 className="text-lg font-bold">Create a Reservation</h2>
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label className="block">Select Room</label>
          <select
            value={roomId || ""}
            onChange={(e) => setRoomId(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" disabled>
              -- Select a Room --
            </option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                №: {room.roomNumber} | capacity: {room.capacity} | type: {room.type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block">Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block">End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Reserve Room
        </button>
      </form>

      <div className="p-4 border rounded">
        <h2 className="text-lg font-bold">Reservations</h2>
        {reservations.length > 0 ? (
          <ul className="space-y-2">
            {reservations.map((reservation) => (
              <li key={reservation.id} className="p-2 border rounded">
                <p>Reservation ID: {reservation.id}</p>
                <p>
                  Start Time: {new Date(reservation.startTime).toLocaleString()}
                </p>
                <p>
                  End Time: {new Date(reservation.endTime).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reservations available</p>
        )}
      </div>
    </div>
  );
};

export default RoomReservationForm;
