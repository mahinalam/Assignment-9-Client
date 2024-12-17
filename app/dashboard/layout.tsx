import { ReactNode } from "react";

import { Sidebar } from "../components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
