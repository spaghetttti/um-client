// components/BuildingForm.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BuildingDTO } from "@/types/buildingDTO";

interface BuildingFormProps {
  building?: BuildingDTO;
}

const BuildingForm: React.FC<BuildingFormProps> = ({ building }) => {
  const router = useRouter();
  const [code, setCode] = useState(building?.code || "");
  const [yearOfConstruction, setYearOfConstruction] = useState(
    building?.yearOfConstruction || ""
  );
  const [campusId, setCampusId] = useState<number | "">(building?.campusId || "");
  const [availableCampuses, setAvailableCampuses] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/campuses`);
        const data = await res.json();
        setAvailableCampuses(data);
      } catch (error) {
        console.error("Failed to fetch campuses", error);
      }
    };

    fetchCampuses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const buildingData = { code, yearOfConstruction, campusId };

    const res = building
      ? await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings/${building.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildingData),
        })
      : await fetch("/api/buildings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildingData),
        });

    if (res.ok) {
      router.push("/buildings");
    } else {
      alert("Error saving building");
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
