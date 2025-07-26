import { Outlet } from "react-router-dom";
import { Sidebar } from "@shared/ui/Sidebar";
import { Header } from "@shared/ui/Header";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
