// components/CampusForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CampusDTO } from "@/types/campusDTO";
import { useAuth } from "@/context/AuthContext";
import httpClient from "@/utils/httpClient";

interface CampusFormProps {
  campus?: CampusDTO;
}

const CampusForm: React.FC<CampusFormProps> = ({ campus }) => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [name, setName] = useState(campus?.name || "");
  const [city, setCity] = useState(campus?.city || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const campusData = { name, city }; // Replace with actual form data
    const url = campus
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/campuses/${campus.id}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/campuses`;
    const method = campus ? "PUT" : "POST";

    try {
      await httpClient(url, method, campusData, currentUser); // Pass currentUser
      router.push("/campuses");
    } catch (error) {
      alert(`Error saving campus: ${(error as Record<string, string>).message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {campus ? "Update Campus" : "Create Campus"}
        </button>
      </div>
    </form>
  );
};

export default CampusForm;
