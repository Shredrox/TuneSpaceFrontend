"use client";

import { SiMusicbrainz } from "react-icons/si";
import { IoHome } from "react-icons/io5";
import { Button } from "@/components/shadcn/Button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const location = usePathname();

  const isActive = (path: string) => {
    return location === path;
  };

  const linksData = [
    { id: 1, to: "/", text: "Home", icon: <IoHome /> },
    {
      id: 2,
      to: "/dashboard",
      text: "Band Dashboard",
      icon: <SiMusicbrainz />,
    },
  ];

  return (
    <aside className="bg-secondary h-screen fixed top-16 left-0 p-4 min-w-[150px]">
      <ul className="flex flex-col gap-2">
        {linksData.map((link) => (
          <li key={link.id}>
            <Button
              key={link.id}
              asChild
              variant={isActive(link.to) ? "default" : "outline"}
              className="flex gap-1"
            >
              <Link key={link.id} href={link.to}>
                {link.icon}
                {link.text}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
