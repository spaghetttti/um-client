import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen"> 
      <Link href="/buildings" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded">Building</Link>
      <Link href="/campuses" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded mt-4">Campuses</Link>
      <Link href="/rooms" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded mt-4">Rooms</Link>
      <Link href="/components" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded mt-4">Components</Link>
    </div>
  );
}