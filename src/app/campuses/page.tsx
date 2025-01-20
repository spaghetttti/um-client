// pages/campus/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CampusDTO } from "@/types/campusDTO";

const CampusesPage = () => {
  const [campuses, setCampuses] = useState<CampusDTO[]>([]);

  useEffect(() => {
    const fetchCampuses = async () => {
      let data;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/campuses`
        );
        data = await res.json();
      } catch (error) {
        console.log(error);
      }
      if (!!data) setCampuses(data);
    };

    fetchCampuses();
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/campuses/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      setCampuses(campuses.filter((campus) => campus.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Campuses</h1>
      <Link href="/campuses/new">
        <p className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">
          Create New Campus
        </p>
      </Link>
      <ul>
        {campuses.map((campus) => (
          <li
            key={campus.id}
            className="flex justify-between items-center mb-4"
          >
            <span>{campus.name}</span>
            <div>
              <Link href={`/campuses/${campus.id}`}>
                <p className="px-2 py-1 bg-yellow-500 text-white rounded mr-2">
                  Edit
                </p>
              </Link>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDelete(campus.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampusesPage;