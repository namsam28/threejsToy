"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="w-full text-32 text-center bg-amber-600 text-white">Three.js Toy project.</h1>
      <ul>
        <li className="px-20 py-10">
          <Link href="/forge" className="text-20  font-bold text-gray-500 hover:text-black">
            대장간
          </Link>
        </li>
      </ul>
    </div>
  );
}
