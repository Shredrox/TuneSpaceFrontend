import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <Sidebar />
        <main className="ml-[150px] mt-16 p-6">{children}</main>
      </div>
    </>
  );
}
