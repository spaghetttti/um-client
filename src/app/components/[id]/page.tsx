// pages/components/[id].tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ComponentDTO } from "@/types/componentDTO";
import ComponentForm from "@/components/ComponentForm";
import AuthGuard from "@/app/auth/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import httpClient from "@/utils/httpClient";

const EditComponentPage = () => {
  const { id } = useParams();
  const [component, setComponent] = useState<ComponentDTO | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (id) {
      const fetchComponent = async () => {
        try {
          const data = await httpClient(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/components/${id}`,
            "GET",
            null,
            currentUser // Pass currentUser
          );
          setComponent(data);
        } catch (error) {
          console.log("Error fetching component:", (error as Record<string, string>).message);
        }
      };
  
      fetchComponent();
    }
  }, []);

  return (
    <AuthGuard allowedRoles={["ADMINISTRATOR", "MANAGER"]}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Edit Component</h1>
        {component && <ComponentForm component={component} />}
      </div>
    </AuthGuard>
  );
};

export default EditComponentPage;
