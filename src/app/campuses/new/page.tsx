// pages/campus/new.tsx
import CampusForm from "@/components/CampusForm";

const NewCampusPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Campus</h1>
      <CampusForm />
    </div>
  );
};

export default NewCampusPage;