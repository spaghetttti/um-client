"use client";
import LogoutButton from "@/components/LogoutButton";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex gap-4">
        {!currentUser ? (
          <>
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
              href="/auth/login"
            >
              Login
            </Link>
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
              href="/auth/register"
            >
              Register
            </Link>
          </>
        ) : (
          <div className="flex items-center">
            <p>{currentUser.email}</p>
            <LogoutButton />
          </div>
        )}
      </div>
      <Link
        href="/buildings"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
      >
        Building
      </Link>
      <Link
        href="/campuses"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded mt-4"
      >
        Campuses
      </Link>
      <Link
        href="/rooms"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded mt-4"
      >
        Rooms
      </Link>
      <Link
        href="/components"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded mt-4"
      >
        Components
      </Link>
    </div>
  );
}
