import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import httpClient from "../utils/httpClient";
import { BuildingDTO } from "@/types/buildingDTO";

export function BuildingDistance() {
  const { currentUser } = useAuth();

  const [buildingsList, setBuildingsList] = useState<BuildingDTO[]>([]);
  const [selectedBuilding1, setSelectedBuilding1] =
    useState<BuildingDTO | null>(null);
  const [selectedBuilding2, setSelectedBuilding2] =
    useState<BuildingDTO | null>(null);
  const [distance, setDistance] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const data = await httpClient(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings`,
          "GET",
          null,
          currentUser
        );
        setBuildingsList(data);
      } catch (error) {
        console.error("Error fetching buildings:", (error as Record<string, string>).message);
      }
    };

    fetchBuildings();
  }, [currentUser]);

  const fetchBuildingDetails = async (
    id: number,
    setBuilding: (building: BuildingDTO) => void
  ) => {
    try {
      const data = await httpClient(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings/${id}`,
        "GET",
        null,
        currentUser
      );
      setBuilding(data);
    } catch (error) {
      console.error("Error fetching building:", (error as Record<string, string>).message);
    }
  };

  const handleBuildingSelection1 = (id: number) => {
    fetchBuildingDetails(id, setSelectedBuilding1);
  };

  const handleBuildingSelection2 = (id: number) => {
    fetchBuildingDetails(id, setSelectedBuilding2);
  };

  const calculateDistance = async () => {
    if (selectedBuilding1 && selectedBuilding2) {
      try {
        const response = await httpClient(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/buildings/distance/${selectedBuilding1.id}/${selectedBuilding2.id}`,
          "GET",
          null,
          currentUser
        );
        setDistance(response);
      } catch (error) {
        console.error("Error calculating distance:", (error as Record<string, string>).message);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">
        Calculate Distance Between Buildings
      </h2>

      <div className="mb-4">
        <label className="block mb-2">Select Building 1</label>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => handleBuildingSelection1(Number(e.target.value))}
        >
          <option value="">-- Select a Building --</option>
          {buildingsList.map((building) => (
            <option key={building.id} value={building.id}>
              {building.code} ({building.yearOfConstruction})
            </option>
          ))}
        </select>
        {selectedBuilding1 && (
          <div className="mt-2 text-sm">
            <p>Code: {selectedBuilding1.code}</p>
            <p>
              Year of Construction: {selectedBuilding1.yearOfConstruction}
            </p>
            <p>
              Coordinates: {selectedBuilding1.latitude},{" "}
              {selectedBuilding1.longitude}
            </p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Select Building 2</label>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => handleBuildingSelection2(Number(e.target.value))}
        >
          <option value="">-- Select a Building --</option>
          {buildingsList.map((building) => (
            <option key={building.id} value={building.id}>
              {building.code} ({building.yearOfConstruction})
            </option>
          ))}
        </select>
        {selectedBuilding2 && (
          <div className="mt-2 text-sm">
            <p>Code: {selectedBuilding2.code}</p>
            <p>
              Year of Construction: {selectedBuilding2.yearOfConstruction}
            </p>
            <p>
              Coordinates: {selectedBuilding2.latitude},{" "}
              {selectedBuilding2.longitude}
            </p>
          </div>
        )}
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={calculateDistance}
        disabled={!selectedBuilding1 || !selectedBuilding2}
      >
        Calculate Distance
      </button>

      {distance && (
        <div className="mt-4 text-green-600 font-semibold">
          <p>{`${distance.distance} ${distance.unit}`}</p>
        </div>
      )}
    </div>
  );
}
