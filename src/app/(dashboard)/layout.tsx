import { Sidebar } from "@/components/shared/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-black selection:bg-emerald-500/30 selection:text-emerald-200">
      <Sidebar />
      <main className="flex-1 overflow-y-auto w-full text-zinc-100 custom-scrollbar">
        <div className="max-w-[1600px] mx-auto p-12 min-h-full flex flex-col">
           {children}
        </div>
      </main>
    </div>
  );
}
