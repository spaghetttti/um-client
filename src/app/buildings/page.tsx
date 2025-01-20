"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BuildingDTO } from "@/types/buildingDTO";

const BuildingsPage = () => {
  const [buildings, setBuildings] = useState<BuildingDTO[]>([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      let data;
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings`
        );
        data = await res.json();
      } catch (error) {
        console.log(error);
      }
      if (!!data) setBuildings(data);
    };

    fetchBuildings();
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      // Remove from the list without fetching again
      setBuildings(buildings.filter((building) => building.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Buildings</h1>
      <Link href="/buildings/new">
        <p className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">
          Create New Building
        </p>
      </Link>
      <ul>
        {buildings.map((building) => (
          <li
            key={building.id}
            className="flex justify-between items-center mb-4"
          >
            <span>{building.code}</span>
            <div>
              <Link href={`/buildings/${building.id}`}>
                <p className="px-2 py-1 bg-yellow-500 text-white rounded mr-2">
                  Edit
                </p>
              </Link>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDelete(building.id)}
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

export default BuildingsPage;
