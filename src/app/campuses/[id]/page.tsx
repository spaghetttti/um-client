// pages/campus/[id].tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CampusDTO } from "@/types/campusDTO";
import CampusForm from "@/components/CampusForm";
import AuthGuard from "@/app/auth/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import httpClient from "@/utils/httpClient";

const EditCampusPage = () => {
  const { id } = useParams();
  const [campus, setCampus] = useState<CampusDTO | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (id) {
      const fetchCampus = async () => {
        try {
          const data = await httpClient(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/campuses/${id}`,
            "GET",
            null,
            currentUser // Pass currentUser
          );
          setCampus(data);
        } catch (error) {
          console.log("Error fetching campus:", (error as Record<string, string>).message);
        }
      };
  
      fetchCampus();
    }
  }, [id, currentUser]);

  return (
    <AuthGuard allowedRoles={["ADMINISTRATOR", "MANAGER"]}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Edit Campus</h1>
        {campus && <CampusForm campus={campus} />}
      </div>
    </AuthGuard>
  );
};

export default EditCampusPage;
