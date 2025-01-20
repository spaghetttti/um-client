// pages/buildings/[id].tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BuildingDTO } from "@/types/buildingDTO";
import BuildingForm from "@/components/BuildingForm";

const EditBuildingPage = () => {
  const { id } = useParams();
  const [building, setBuilding] = useState<BuildingDTO | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBuilding = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings/${id}`
        );
        const data = await res.json();
        setBuilding(data);
      };
      fetchBuilding();
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Building</h1>
      {building && <BuildingForm building={building} />}
    </div>
  );
};

export default EditBuildingPage;
