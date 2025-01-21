// components/BuildingForm.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BuildingDTO } from "@/types/buildingDTO";
import httpClient from "@/utils/httpClient";
import { useAuth } from "@/context/AuthContext";

interface BuildingFormProps {
  building?: BuildingDTO;
}

const BuildingForm: React.FC<BuildingFormProps> = ({ building }) => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [code, setCode] = useState(building?.code || "");
  const [yearOfConstruction, setYearOfConstruction] = useState(
    building?.yearOfConstruction || ""
  );
  const [campusId, setCampusId] = useState<number | "">(
    building?.campusId || ""
  );
  const [availableCampuses, setAvailableCampuses] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const data = await httpClient(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/campuses`,
          "GET",
          null,
          currentUser // Pass currentUser
        );
        setAvailableCampuses(data);
      } catch (error) {
        console.log("Error fetching campuses:", (error as Record<string, string>).message);
      }
    };
  
    fetchCampuses();
  }, [currentUser]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const buildingData = { code, yearOfConstruction, campusId };
    const url = building
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings/${building.id}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings`;
    const method = building ? "PUT" : "POST";

    try {
      await httpClient(
        url,
        method,
        buildingData,
        currentUser // Pass currentUser
      );
      router.push("/buildings");
    } catch (error) {
      alert(`Error saving building: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Code</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block">Year of Construction</label>
        <input
          type="number"
          value={yearOfConstruction}
          onChange={(e) => setYearOfConstruction(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block">Campus</label>
        <select
          value={campusId}
          onChange={(e) => setCampusId(Number(e.target.value))}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a campus</option>
          {availableCampuses.map((campus) => (
            <option key={campus.id} value={campus.id}>
              {campus.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {building ? "Update Building" : "Create Building"}
        </button>
      </div>
    </form>
  );
};

export default BuildingForm;
