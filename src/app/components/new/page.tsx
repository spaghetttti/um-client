// pages/components/new.tsx
"use client";
import AuthGuard from "@/app/auth/AuthGuard";
import ComponentForm from "@/components/ComponentForm";

const NewComponentPage = () => {
  return (
    <AuthGuard allowedRoles={["ADMINISTRATOR", "MANAGER"]}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Create New Component</h1>
        <ComponentForm />
      </div>
    </AuthGuard>
  );
};

export default NewComponentPage;
