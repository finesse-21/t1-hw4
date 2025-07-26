import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@pages/LoginPage/LoginPage";
import { HomePage } from "@pages/HomePage/HomePage";
import { UserCreatePage } from "@pages/UserCreatePage/UserCreatePage";
import { UserEditPage } from "@pages/UserEditPage/UserEditPage";
import { MainLayout } from "@widgets/Layout/MainLayout";
import { RequireAuth } from "@shared/lib/guards/RequireAuth";
import { UserCreateRHFPage } from "@pages/UserCreateRHFPage/UserCreateRHFPage";

export const Routing = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />

    <Route element={<MainLayout />}>
      <Route
        path="/"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />
      <Route
        path="/user/create"
        element={
          <RequireAuth>
            <UserCreatePage />
          </RequireAuth>
        }
      />
      <Route
        path="/user/create-rhf"
        element={
          <RequireAuth>
            <UserCreateRHFPage />
          </RequireAuth>
        }
      />
      <Route
        path="/user/edit/:id"
        element={
          <RequireAuth>
            <UserEditPage />
          </RequireAuth>
        }
      />
    </Route>

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);
