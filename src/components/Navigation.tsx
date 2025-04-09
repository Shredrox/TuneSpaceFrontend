"use client";

import { Button } from "@/components/shadcn/Button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/shadcn/NavigationMenu";
import { DiscAlbum, House, Newspaper } from "lucide-react";
import { ROUTES } from "@/utils/constants";

const Navigation = () => {
  const location = usePathname();

  const isActive = (path: string) => {
    return location === path;
  };

  const linksData = [
    { id: 1, to: ROUTES.HOME, text: "Home", icon: <House /> },
    {
      id: 2,
      to: ROUTES.BAND_DASHBOARD,
      text: "Dashboard",
      icon: <DiscAlbum />,
    },
    {
      id: 3,
      to: ROUTES.NEWS,
      text: "News",
      icon: <Newspaper />,
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
    </div>
  );
};

export default Navigation;
