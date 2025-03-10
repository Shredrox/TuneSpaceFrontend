"use client";

import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { LoginForm } from "@/components/shadcn/LoginForm";
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
        <SidebarProvider defaultOpen={false}>
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
            {/* <div className="flex flex-col  justify-center items-center">
            <span className="text-xl">Are you an artist?</span>
            <span>Register here</span>
            <Button>
              <Link href="band/register">Register</Link>
            </Button>
          </div> */}
            <div className="flex flex-col justify-center items-center w-full">
              {/* <span className="text-xl">Want to discover bands?</span>
            <span>Enter here</span> */}
              {/* <AccessForm shouldRedirect={true} /> */}
              <LoginForm className="w-[750px]" />
            </div>
          </div>
        </div>
      </>
    );
  }
}
