import { Button } from "antd";
import { logoutThunk } from "@features/auth/model/logoutThunk";
import { useAppDispatch } from "@shared/lib/hooks";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 border-b">
      <div className="text-xl font-bold">Админ-панель</div>
      <Button danger onClick={handleLogout}>
        Выйти
      </Button>
    </header>
  );
};
