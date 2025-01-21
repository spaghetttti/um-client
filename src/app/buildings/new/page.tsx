// pages/buildings/new.tsx
import AuthGuard from "@/app/auth/AuthGuard";
import BuildingForm from "@/components/BuildingForm";

const NewBuildingPage = () => {
  return (
    <AuthGuard allowedRoles={["ADMINISTRATOR", "MANAGER"]}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Create New Building</h1>
        <BuildingForm />
      </div>
    </AuthGuard>
  );
};

export default NewBuildingPage;
