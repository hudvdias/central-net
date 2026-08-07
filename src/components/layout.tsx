import { NavLink, Outlet } from "react-router";

export function Layout() {
  const date = new Date().toLocaleDateString("pt-br", { dateStyle: "full" });

  return (
    <div className="h-full flex" id="container">
      <aside className="w-64 bg-emerald-600 text-white">
        <p className="text-center text-4xl font-extrabold uppercase mt-2">Unimed</p>
        <p className="text-center">Leste Fluminense</p>
        <p className="text-center mt-4">Central Net</p>

        <div className="flex flex-col p-4">
          <NavLink to="/" className="px-3 py-1 rounded hover:brightness-120 bg-emerald-600 w-full">
            Informativo
          </NavLink>
        </div>
      </aside>

      <main className="flex flex-col w-full">
        <header className="p-4 border-b">Unimed - {date}</header>
        <Outlet />
      </main>
    </div>
  );
}
