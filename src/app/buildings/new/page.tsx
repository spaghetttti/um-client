// pages/buildings/new.tsx
import BuildingForm from "@/components/BuildingForm";

const NewBuildingPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Building</h1>
      <BuildingForm />
    </div>
  );
};

export default NewBuildingPage;
