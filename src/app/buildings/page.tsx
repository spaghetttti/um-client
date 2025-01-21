"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BuildingDTO } from "@/types/buildingDTO";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/types/userDTO";
import { useRouter } from "next/navigation";
import { CustomButton } from "@/components/CustomButton";
import httpClient from "@/utils/httpClient";
import { BuildingDistance } from "@/components/BuildingDistance";

const BuildingsPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [buildings, setBuildings] = useState<BuildingDTO[]>([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const data = await httpClient(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings`,
          "GET",
          null,
          currentUser // Pass currentUser
        );
        setBuildings(data);
      } catch (error) {
        console.log("Error fetching buildings:", (error as Record<string, string>).message);
      }
    };

    fetchBuildings();
  }, [currentUser]); // Dependency on currentUser

  const handleDelete = async (id: number) => {
    try {
      await httpClient(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings/${id}`,
        "DELETE",
        null, // No body for DELETE
        currentUser // Pass currentUser as a parameter
      );
      setBuildings(buildings.filter((building) => building.id !== id));
    } catch (error) {
      console.error("Error deleting building:", (error as Record<string, string>).message);
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
      <BuildingDistance />
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
