import { useContext, useState, type SubmitEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { databaseContext } from "../../../context/database-context";
import type { Category } from "../../../types/category";
import { createSlug } from "../../../utils/create-slug";

export function EditCategoryPage() {
  const useDatabase = useContext(databaseContext);
  const navigate = useNavigate();
  const { category_id } = useParams();
  const category = useDatabase.categories.find((item) => item.id === category_id);

  const [title, setTitle] = useState(category?.title || "");

  function editCategory(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title || !category) return;
    const newCategory: Category = {
      ...category,
      title: title,
      slug: createSlug(title),
    };
    useDatabase.editCategory(newCategory);
    setTitle("");
    alert("Categoria alterada com sucesso!");
    navigate("/admin");
  }

  if (!category) {
    return (
      <div className="p-4 flex flex-col">
        <p className="bg-red-100 border border-red-300 text-red-600 rounded p-4">⚠️ Categoria não encontrada.</p>
        <Link to="/admin" className="px-4 py-2 bg-emerald-600 text-white rounded mt-4 w-max">
          Retornar
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 overflow-auto">
      {/* breadcrumbs */}
      <div className="flex items-center gap-2 mb-4">
        <Link to="/admin" className="text-blue-600 underline">
          Administração de Conteúdo
        </Link>
        <span>{">"}</span>
        <span>Editar Categoria</span>
      </div>

      {/* form */}
      <form className="flex flex-col p-8 bg-white shadow-lg rounded-lg" onSubmit={(event) => editCategory(event)}>
        <p className="mb-4 font-semibold text-lg">Editar categoria - {category.title}</p>
        <label htmlFor="title">Título*</label>
        <input type="text" name="title" placeholder="Digite um título" required value={title} onChange={(event) => setTitle(event.target.value)} className="px-3 py-1 border rounded" />
        <button type="submit" className="px-4 py-2 rounded bg-emerald-600 text-white cursor-pointer mt-6 hover:brightness-120">
          Salvar alterações
        </button>
      </form>
    </div>
  );
}
