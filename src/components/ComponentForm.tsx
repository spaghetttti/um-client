// components/ComponentForm.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ComponentDTO } from "@/types/componentDTO";
import httpClient from "@/utils/httpClient";
import { useAuth } from "@/context/AuthContext";

interface ComponentFormProps {
  component?: ComponentDTO;
}

const ComponentForm: React.FC<ComponentFormProps> = ({ component }) => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [acronym, setAcronym] = useState(component?.acronym || "");
  const [name, setName] = useState(component?.name || "");
  const [responsiblePerson, setResponsiblePerson] = useState(
    component?.responsiblePerson || ""
  );
  const [exploitedBuildings, setExploitedBuildings] = useState<
    { id: number; code: string }[]
  >(component?.exploitedBuildings || []);
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
    console.log(exploitedBuildings.map((building) => building.id))
    const componentData = {
      acronym,
      name,
      responsiblePerson,
      exploitedBuildings: exploitedBuildings.map((building) => building.id),
    };

    const url = component
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/components/${component.id}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/components`;
    const method = component ? "PUT" : "POST";

    try {
      await httpClient(url, method, componentData, currentUser); // Pass currentUser
      router.push("/components");
    } catch (error) {
      alert(
        `Error saving component: ${(error as Record<string, string>).message}`
      );
    }
  };

  const toggleBuildingSelection = (id: number) => {
    const buildingExists = exploitedBuildings.some(
      (building) => building.id === id
    );

    if (buildingExists) {
      setExploitedBuildings(
        exploitedBuildings.filter((building) => building.id !== id)
      );
    } else {
      const selectedBuilding = availableBuildings.find(
        (building) => building.id === id
      );
      console.log(selectedBuilding);
      if (selectedBuilding) {
        setExploitedBuildings([...exploitedBuildings, selectedBuilding]);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Acronym</label>
        <input
          type="text"
          value={acronym}
          onChange={(e) => setAcronym(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block">Responsible Person</label>
        <input
          type="text"
          value={responsiblePerson}
          onChange={(e) => setResponsiblePerson(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block">Building IDs</label>
        <div className="w-full p-2 border rounded">
          {availableBuildings.map((building) => (
            <div key={building.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`building-${building.id}`}
                checked={exploitedBuildings.some((v) => v.id === building.id)}
                onChange={() => toggleBuildingSelection(building.id)}
                className="mr-2"
              />
              <label htmlFor={`building-${building.id}`}>{building.code}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {component ? "Update Component" : "Create Component"}
        </button>
      </div>
    </form>
  );
};

export default ComponentForm;
