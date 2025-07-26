import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@pages/LoginPage/LoginPage";
import { HomePage } from "@pages/HomePage/HomePage";
import { UserCreatePage } from "@pages/UserCreatePage/UserCreatePage";
import { UserEditPage } from "@pages/UserEditPage/UserEditPage";
import { MainLayout } from "@widgets/Layout/MainLayout";

export const Routing = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/user/create" element={<UserCreatePage />} />
      <Route path="/user/edit/:id" element={<UserEditPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);
