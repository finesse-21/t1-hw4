import { Layout, Typography } from "antd";

export const Header = () => (
  <Layout.Header className="bg-white shadow px-4 flex items-center justify-between">
    <Typography.Title level={4} className="!m-0">
      Панель управления
    </Typography.Title>
  </Layout.Header>
);
