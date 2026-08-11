import { useContext, useState, type SubmitEvent } from "react";
import { NavLink, useNavigate } from "react-router";
import { databaseContext } from "../../../context/database-context";
import type { Category } from "../../../types/category";
import { createSlug } from "../../../utils/create-slug";

export function CreateCategoryPage() {
  const [title, setTitle] = useState("");
  const useDatabase = useContext(databaseContext);
  const navigate = useNavigate();

  function createCategory(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (title === "") return;
    const category: Category = {
      id: crypto.randomUUID(),
      title,
      slug: createSlug(title),
    };
    useDatabase.createCategory(category);
    setTitle("");
    alert("Categoria criada com sucesso!");
    navigate("/admin");
  }

  return (
    <div className="flex flex-col p-8 overflow-auto">
      {/* breadcrumbs */}
      <div className="flex items-center gap-2 mb-4">
        <NavLink to="/admin" className="text-blue-600 underline">
          Administração de Conteúdo
        </NavLink>
        <span>{">"}</span>
        <span>Criar Categoria</span>
      </div>

      {/* form */}
      <form className="flex flex-col p-8 bg-white shadow-lg rounded-lg" onSubmit={(event) => createCategory(event)}>
        <p className="mb-4 font-semibold text-lg">Criar nova categoria</p>
        <label htmlFor="title">Título*</label>
        <input type="text" name="title" placeholder="Digite um título" required value={title} onChange={(event) => setTitle(event.target.value)} className="px-3 py-1 border rounded" />
        <button type="submit" className="px-4 py-2 rounded bg-emerald-600 text-white cursor-pointer mt-6 hover:brightness-120">
          Criar
        </button>
      </form>
    </div>
  );
}
