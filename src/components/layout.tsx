import { useContext, useState, type SubmitEvent } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { databaseContext } from "../context/database-context";

export function Layout() {
  const [search, setSearch] = useState("");
  const useDatabase = useContext(databaseContext);
  const date = new Date().toLocaleDateString("pt-br", { dateStyle: "full" });
  const navigate = useNavigate();

  async function handleSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(`/search?search=${search}`);
  }

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
        <header className="p-4 border-b">
          <p>Data: {date}</p>
          <form className="flex gap-4 items-center mt-4" onSubmit={(event) => handleSearch(event)}>
            <input type="search" name="search" className="px-4 py-2 rounded-lg shadow-lg bg-white w-xl border border-gray-500" placeholder="Pesquisar" value={search} onChange={(event) => setSearch(event.target.value)} />
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded cursor-pointer">
              Pesquisar
            </button>
          </form>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
