import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@shared/lib/utils";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 sm:hidden bg-white shadow-lg rounded-lg p-2 flex items-center"
        onClick={() => setOpen(true)}
        aria-label="Открыть меню"
      >
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 1024 1024"
            fill="currentColor"
          >
            <path d="M160 248h704v64H160zm0 232h704v64H160zm0 232h704v64H160z" />
          </svg>
        </span>
      </button>

      <aside className="w-64 bg-white shadow-lg p-6 h-screen sticky top-0 flex-col hidden sm:flex">
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

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg p-6 flex flex-col transition-transform sm:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          className="self-end mb-6 text-gray-900 text-xl"
          onClick={() => setOpen(false)}
          aria-label="Закрыть меню"
        >
          ×
        </button>
        <nav className="space-y-2 mt-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition-colors",
                isActive && "bg-gray-900 text-white hover:text-black"
              )
            }
            onClick={() => setOpen(false)}
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
            onClick={() => setOpen(false)}
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
            onClick={() => setOpen(false)}
          >
            Создать пользователя (RHF)
          </NavLink>
        </nav>
      </aside>
    </>
  );
};
