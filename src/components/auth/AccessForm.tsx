"use client";

import { FaSpotify } from "react-icons/fa";
import Register from "./Register";
import Login from "./Login";
import { useState } from "react";
import { Button } from "@/components/shadcn/Button";
import { BASE_URL, SPOTIFY_ENDPOINTS } from "@/utils/constants";
import { useRouter } from "next/navigation";

const AccessForm = () => {
  const [activeButton, setActiveButton] = useState("login");
  const router = useRouter();

  const handleSpotifyLogin = () => {
    router.push(`${BASE_URL}/${SPOTIFY_ENDPOINTS.LOGIN}`);
  };

  const handleButtonChange = (btn: string) => {
    setActiveButton(btn);
  };

  return (
    <div className="flex flex-col items-center bg-card border rounded-xl p-4 w-[420px] h-[500px]">
      <div className="flex gap-2">
        <Button
          onClick={() => handleButtonChange("login")}
          variant={activeButton === "login" ? "default" : "outline"}
        >
          Login
        </Button>
        <Button
          onClick={() => handleButtonChange("register")}
          variant={activeButton === "register" ? "default" : "outline"}
        >
          Register
        </Button>
      </div>

      <div className="flex justify-center h-[500px]">
        {activeButton === "login" ? <Login /> : <Register />}
      </div>

      <button
        className="bg-[#1A4645] rounded p-2 flex justify-center items-center gap-2 w-[230px]"
        onClick={handleSpotifyLogin}
      >
        Log In With Spotify <FaSpotify className="w-8 h-8 text-[#1ed760]" />
      </button>
    </div>
  );
};

export default AccessForm;
