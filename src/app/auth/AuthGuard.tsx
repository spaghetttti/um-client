"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
  allowedRoles: string[]; // List of allowed roles
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ allowedRoles, children }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser || !allowedRoles.includes(currentUser.role)) {
      // Redirect unauthorized users
      router.push("/unauthorized");
    }
  }, [currentUser, allowedRoles, router]);

  // Show nothing while checking the user's role
  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
