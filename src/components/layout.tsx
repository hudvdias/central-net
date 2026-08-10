import { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import { databaseContext } from "../context/database-context";

export function Layout() {
  const useDatabase = useContext(databaseContext);
  const date = new Date().toLocaleDateString("pt-br", { dateStyle: "full" });

  return (
    <div className="h-full flex" id="container">
      <aside className="w-64 bg-emerald-600 text-white">
        <p className="text-center text-4xl font-extrabold uppercase mt-2">Unimed</p>
        <p className="text-center tracking-widest">Leste Fluminense</p>
        <p className="text-center mt-8 font-semibold text-xl">Central Net</p>

        <div className="flex flex-col mt-8">
          {useDatabase.categories.map((category) => {
            return (
              <NavLink key={category.id} to={`${category.slug}`}>
                {({ isActive }) => {
                  return <div className={`px-4 py-2 w-full ${isActive ? "bg-gray-100 text-emerald-600" : "bg-emerald-600 text-white hover:brightness-120"}`}>{category.title}</div>;
                }}
              </NavLink>
            );
          })}
        </div>
      </aside>

      <main className="flex flex-col w-full">
        <header className="p-4 border-b">Data: {date}</header>
        <Outlet />
      </main>
    </div>
  );
}
