"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BuildingDTO } from "@/types/buildingDTO";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/types/userDTO";
import { useRouter } from "next/navigation";
import { CustomButton } from "@/components/CustomButton";

const BuildingsPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [buildings, setBuildings] = useState<BuildingDTO[]>([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      let data;
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
            className="flex justify-between items-center mb-4 px-4 py-2 rounded bg-slate-800"
          >
            <span>{building.code}</span>
            <div className="flex">
              <CustomButton
                disabled={
                  !currentUser || currentUser.role !== Role.ADMINISTRATOR
                }
                onClick={() => router.push(`/buildings/${building.id}`)}
              >
                Edit
              </CustomButton>
              <CustomButton
                bgColor=" bg-red-500"
                disabled={
                  !currentUser || currentUser.role !== Role.ADMINISTRATOR
                }
                onClick={() => handleDelete(building.id)}
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

export default BuildingsPage;
