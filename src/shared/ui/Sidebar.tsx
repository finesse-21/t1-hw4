import { NavLink } from "react-router-dom";
import { cn } from "@shared/lib/utils";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg p-6 h-screen sticky top-0 flex flex-col">
      <nav className="space-y-2 mt-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition-colors",
              isActive && "bg-gray-900 text-white hover:text-black"
            )
          }
        >
          Главная
        </NavLink>
        <NavLink
          to="/user/create-formik"
          className={({ isActive }) =>
            cn(
              "block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition-colors",
              isActive && "bg-gray-900 text-white hover:text-black"
            )
          }
        >
          Создать пользователя (Formik)
        </NavLink>
        <NavLink
          to="/user/create-rhf"
          className={({ isActive }) =>
            cn(
              "block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition-colors",
              isActive && "bg-gray-900 text-white hover:text-black"
            )
          }
        >
          Создать пользователя (RHF)
        </NavLink>
      </nav>
    </aside>
  );
};
