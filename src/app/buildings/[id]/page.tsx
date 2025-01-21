// pages/buildings/[id].tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BuildingDTO } from "@/types/buildingDTO";
import BuildingForm from "@/components/BuildingForm";
import AuthGuard from "@/app/auth/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import httpClient from "@/utils/httpClient";

const EditBuildingPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [building, setBuilding] = useState<BuildingDTO | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBuilding = async () => {
        try {
          const data = await httpClient(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings/${id}`,
            "GET",
            null,
            currentUser // Pass currentUser
          );
          setBuilding(data);
        } catch (error) {
          console.log("Error fetching building:", (error as Record<string, string>).message);
        }
      };
  
      fetchBuilding();
    }
  }, [id, currentUser]);

  return (
    <AuthGuard allowedRoles={["ADMINISTRATOR", "MANAGER"]}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Edit Building</h1>
        {building && <BuildingForm building={building} />}
      </div>
    </AuthGuard>
  );
};

export default EditBuildingPage;
