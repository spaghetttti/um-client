// pages/campus/[id].tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CampusDTO } from "@/types/campusDTO";
import CampusForm from "@/components/CampusForm";

const EditCampusPage = () => {
  const { id } = useParams();
  const [campus, setCampus] = useState<CampusDTO | null>(null);

  useEffect(() => {
    if (id) {
      const fetchCampus = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/campuses/${id}`);
        const data = await res.json();
        setCampus(data);
      };
      fetchCampus();
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Campus</h1>
      {campus && <CampusForm campus={campus} />}
    </div>
  );
};

export default EditCampusPage;