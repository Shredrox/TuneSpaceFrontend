"use client";

import { SiMusicbrainz } from "react-icons/si";
import { IoHome } from "react-icons/io5";
import { Button } from "@/components/shadcn/Button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/shadcn/NavigationMenu";
import { Separator } from "./shadcn/Separator";

const Navigation = () => {
  const location = usePathname();

  const isActive = (path: string) => {
    return location === path;
  };

  const linksData = [
    { id: 1, to: "/", text: "Home", icon: <IoHome /> },
    {
      id: 2,
      to: "/band/dashboard",
      text: "Dashboard",
      icon: <SiMusicbrainz />,
    },
  ];

  return (
    <div className="bg-secondary">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-1 items-center">
          {linksData.map((link) => (
            <div key={link.id}>
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
            </div>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <ul className="flex flex-col gap-2"></ul>
    </div>
  );
};

export default Navigation;
