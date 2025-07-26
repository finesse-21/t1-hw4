import { Button, Typography } from "antd";
import { logoutThunk } from "@features/auth/model/logoutThunk";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-8 py-5 bg-white shadow-lg rounded-b-2xl font-sans">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
        Админ-панель
      </h1>
      <div className="flex items-center gap-6">
        {user?.email && (
          <Typography.Text className="hidden sm:inline-block !text-base !text-gray-700 !font-medium !bg-gray-100 !rounded-lg !px-4 !py-2">
            {user.email}
          </Typography.Text>
        )}
        <Button
          onClick={handleLogout}
          className="!bg-gray-900 !border-none !text-white !font-semibold !rounded-lg !py-2 !px-6 hover:!bg-gray-800 transition"
        >
          Выйти
        </Button>
      </div>
    </header>
  );
};
