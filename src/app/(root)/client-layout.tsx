"use client";

import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { AuthForm } from "@/components/auth/AuthForm";
import { SidebarProvider } from "@/components/shadcn/Sidebar";
import useAuth from "@/hooks/useAuth";

export default function MainClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth } = useAuth();

  if (auth.accessToken) {
    return (
      <>
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
          <main className="relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow">
            <Header />
            <div className="p-4">{children}</div>
          </main>
        </SidebarProvider>
      </>
    );
  } else {
    return (
      <>
        <div className="w-full h-screen flex justify-center flex-col items-center gap-12">
          <h1 className="text-7xl">TuneSpace</h1>
          <div className="flex justify-center items-center gap-4">
            <div className="flex flex-col justify-center items-center w-full">
              <AuthForm className="w-[750px]" />
            </div>
          </div>
        </div>
      </>
    );
  }
}
