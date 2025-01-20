// components/ComponentForm.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ComponentDTO } from "@/types/componentDTO";

interface ComponentFormProps {
  component?: ComponentDTO;
}

const ComponentForm: React.FC<ComponentFormProps> = ({ component }) => {
  const router = useRouter();
  const [acronym, setAcronym] = useState(component?.acronym || "");
  const [name, setName] = useState(component?.name || "");
  const [responsiblePerson, setResponsiblePerson] = useState(component?.responsiblePerson || "");
  const [exploitedBuildings, setExploitedBuildings] = useState<unknown[]>(component?.exploitedBuildings || []);
  const [availableBuildings, setAvailableBuildings] = useState<{ id: number; code: string }[]>([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings`);
        const data = await res.json();
        setAvailableBuildings(data);
      } catch (error) {
        console.error("Failed to fetch buildings", error);
      }
    };

    fetchBuildings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const componentData = {
      acronym,
      name,
      responsiblePerson,
      exploitedBuildings,
    };

    const res = component
      ? await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/components/${component.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(componentData),
        })
      : await fetch("/api/components", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(componentData),
        });

    if (res.ok) {
      router.push("/components");
    } else {
      alert("Error saving component");
    }
  };

  const toggleBuildingSelection = (id: number) => {
    if (exploitedBuildings.includes(id)) {
      setExploitedBuildings(exploitedBuildings.filter((buildingId) => buildingId !== id));
    } else {
      setExploitedBuildings([...exploitedBuildings, id]);
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                checked={Boolean(exploitedBuildings.find((v): boolean => (v as any).id === building.id))}
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
