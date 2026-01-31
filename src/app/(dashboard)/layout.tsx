import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardMobileNav } from "@/components/layout/DashboardMobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
         <DashboardMobileNav />
         <main className="flex-1 p-6 md:p-8 pt-6">
            {children}
         </main>
      </div>
    </div>
  );
}
