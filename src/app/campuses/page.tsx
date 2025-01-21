// pages/campus/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CampusDTO } from "@/types/campusDTO";
import { CustomButton } from "@/components/CustomButton";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Role } from "@/types/userDTO";
import httpClient from "@/utils/httpClient";

const CampusesPage = () => {
  const [campuses, setCampuses] = useState<CampusDTO[]>([]);
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const data = await httpClient(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/campuses`,
          "GET",
          null,
          currentUser // Pass currentUser
        );
        setCampuses(data);
      } catch (error) {
        console.log("Error fetching campuses:", (error as Record<string, string>).message);
      }
    };
  
    fetchCampuses();
  }, [currentUser]); 
  
  const handleDelete = async (id: number) => {
    try {
      await httpClient(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/campuses/${id}`,
        "DELETE",
        null,
        currentUser // Pass currentUser
      );
      setCampuses(campuses.filter((campus) => campus.id !== id));
    } catch (error) {
      console.log("Error deleting campus:", (error as Record<string, string>).message);
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
            className="flex justify-between items-center mb-4 px-4 py-2 rounded bg-slate-800"
          >
            <span>{campus.name}</span>
            <div>
              <CustomButton
                disabled={
                  !currentUser || currentUser.role !== Role.ADMINISTRATOR
                }
                onClick={() => router.push(`/campuses/${campus.id}`)}
              >
                Edit
              </CustomButton>
              <CustomButton
                bgColor="bg-red-500"
                disabled={
                  !currentUser || currentUser.role !== Role.ADMINISTRATOR
                }
                onClick={() => handleDelete(campus.id)}
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

export default CampusesPage;
