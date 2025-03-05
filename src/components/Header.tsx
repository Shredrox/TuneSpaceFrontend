"use client";

import useLogout from "../hooks/useLogout";
import { ModeToggle } from "@/components/shadcn/ModeToggle";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/DropdownMenu";
import { LogOut, User } from "lucide-react";
import SpotifySearchBar from "./SpotifySearchBar";
import { redirect } from "next/navigation";
import { LuMusic4 } from "react-icons/lu";

const Header = () => {
  const logout = useLogout();

  const handleLogout = async () => {
    //await logout();
    redirect("/");
  };

  return (
    <header
      className="bg-[#18191b] backdrop-blur 
    border-b supports-[backdrop-filter]:bg-background/60 
    w-full flex justify-between items-center h-16 p-4 fixed top-0 z-50"
    >
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight flex items-center gap-2">
        <LuMusic4 /> TuneSpace
      </h3>
      <div className="w-1/3 flex relative">
        {/* <SearchBar/> */}
        <SpotifySearchBar />
      </div>
      <div className="flex gap-2">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => redirect("/profile/hello")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
