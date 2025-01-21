"use client"
import { useAuth } from "@/context/AuthContext";

const LogoutButton = () => {
  const { setCurrentUser } = useAuth();

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
      Logout
    </button>
  );
};

export default LogoutButton;
