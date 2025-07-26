import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@shared/ui/Sidebar";
import { Header } from "@shared/ui/Header";

export const MainLayout = () => {
  const location = useLocation();

  if (location.pathname === "/login") return <Outlet />;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header />
        <Layout.Content className="p-4">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
