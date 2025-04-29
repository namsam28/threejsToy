"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="w-full text-32 text-center bg-amber-600 text-white">Three.js Toy project.</h1>

      <div>
        <h2>기본 연습</h2>
        <ul>
          <li className="px-20 py-10">
            <Link href="/forge" className="text-20  font-bold text-gray-500 hover:text-black">
              회전 + 마우스 인터랙션
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
