"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const paths = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    id: 2,
    name: "Questions",
    path: "/dashboard/questions",
  },
  {
    id: 3,
    name: "Upgrade",
    path: "/dashboard/upgrade",
  },
  {
    id: 4,
    name: "How it Works",
    path: "/dashboard/how",
  },
];

function Header() {
  const selectedPath = usePathname();
  const [path, setPath] = useState(selectedPath);
  const router = useRouter();
  return (
    <div className="flex p-4 items-center justify-between shadow-md">
      {/* <Image src={"/logo.svg"} alt="logo" width={160} height={100} /> */}
      <h2 className="text-3xl text-primary font-bold">Interview Saathi</h2>
      <ul className="hidden md:flex gap-6">
        {paths.map((item, index) => (
          <li
            className={`hover:font-bold transition-all cursor-pointer ${
              path == item.path
            &&'text-primary font-bold'}`}
            onClick={() => {setPath(item.path); router.replace(item.path)}}
            key={index}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
