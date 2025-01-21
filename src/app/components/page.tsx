// pages/components/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ComponentDTO } from "@/types/componentDTO";
import { CustomButton } from "@/components/CustomButton";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/types/userDTO";

const ComponentsPage = () => {
  const [components, setComponents] = useState<ComponentDTO[]>([]);
  const { currentUser } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    const fetchComponents = async () => {
      let data;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/components`
        );
        data = await res.json();
      } catch (error) {
        console.log(error);
      }
      if (!!data) setComponents(data);
    };

    fetchComponents();
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/components/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      setComponents(components.filter((component) => component.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Components</h1>
      <Link href="/components/new">
        <p className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">
          Create New Component
        </p>
      </Link>
      <ul>
        {components.map((component) => (
          <li
            key={component.id}
            className="flex justify-between items-center mb-4 px-4 py-2 rounded bg-slate-800"
          >
            <span>{component.name}</span>
            <div>
              <CustomButton
                disabled={
                  !currentUser || currentUser.role !== Role.ADMINISTRATOR
                }
                onClick={() => router.push(`/components/${component.id}`)}
              >
                Edit
              </CustomButton>
              <CustomButton
                bgColor="bg-red-500"
                disabled={
                  !currentUser || currentUser.role !== Role.ADMINISTRATOR
                }
                onClick={() => handleDelete(component.id)}
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

export default ComponentsPage;
