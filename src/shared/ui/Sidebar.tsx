import { Layout, Menu } from "antd";
import { UserAddOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Главная",
      onClick: () => navigate("/"),
    },
    {
      key: "create",
      icon: <UserAddOutlined />,
      label: "Создать пользователя",
      onClick: () => navigate("/user/create"),
    },
  ];

  return (
    <Layout.Sider width={200} className="bg-white min-h-screen">
      <Menu mode="inline" items={items} className="h-full border-r-0" />
    </Layout.Sider>
  );
};
