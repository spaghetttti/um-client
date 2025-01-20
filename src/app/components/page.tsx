// pages/components/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ComponentDTO } from "@/types/componentDTO";

const ComponentsPage = () => {
  const [components, setComponents] = useState<ComponentDTO[]>([]);

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
            className="flex justify-between items-center mb-4"
          >
            <span>{component.name}</span>
            <div>
              <Link href={`/components/${component.id}`}>
                <p className="px-2 py-1 bg-yellow-500 text-white rounded mr-2">
                  Edit
                </p>
              </Link>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDelete(component.id)}
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

export default ComponentsPage;