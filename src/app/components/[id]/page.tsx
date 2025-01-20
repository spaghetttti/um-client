// pages/components/[id].tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ComponentDTO } from "@/types/componentDTO";
import ComponentForm from "@/components/ComponentForm";

const EditComponentPage = () => {
  const { id } = useParams();
  const [component, setComponent] = useState<ComponentDTO | null>(null);

  useEffect(() => {
    if (id) {
      const fetchComponent = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/components/${id}`);
        const data = await res.json();
        setComponent(data);
      };
      fetchComponent();
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Component</h1>
      {component && <ComponentForm component={component} />}
    </div>
  );
};

export default EditComponentPage;