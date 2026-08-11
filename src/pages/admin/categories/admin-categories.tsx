import { useContext } from "react";
import { NavLink } from "react-router";
import { databaseContext } from "../../../context/database-context";
import type { Category } from "../../../types/category";

export function AdminCategoriesPage() {
  const useDatabase = useContext(databaseContext);

  async function deleteCategory(category: Category) {
    const confirmation = confirm(`Deseja realmente deletar a categoria "${category.title}"?\nObserve que todas as publicações da categoria ficarão órfãs.`);
    if (!confirmation) return;
    useDatabase.deleteCategory(category.id);
    alert("Categoria deletada com sucesso!");
    return;
  }

  return (
    <div className="flex flex-col p-8 overflow-auto">
      <p className="">Administração de Conteúdo</p>

      <div className="flex flex-col gap-8 mt-4 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">Categorias ({useDatabase.categories.length})</p>
          <div className="flex items-center gap-4">
            <NavLink to="/admin/create-post" className="py-2 px-4 rounded bg-emerald-600 text-white w-max hover:brightness-120">
              Criar nova publicação
            </NavLink>
            <NavLink to="/admin/create-category" className="py-2 px-4 rounded bg-emerald-600 text-white w-max hover:brightness-120">
              Criar nova categoria
            </NavLink>
          </div>
        </div>

        <table className="table-auto border rounded border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left font-medium bg-gray-100">Título</th>
              <th className="border border-gray-300 p-2 text-left font-medium bg-gray-100">Publicações</th>
              <th className="border border-gray-300 p-2 text-right font-medium bg-gray-100">Ações</th>
            </tr>
          </thead>
          <tbody>
            {useDatabase.categories.map((category) => {
              const postsQuantity = useDatabase.posts.filter((item) => item.categoryId === category.id).length;

              return (
                <tr key={category.id}>
                  <td className="border border-gray-300 p-2 text-left">
                    <NavLink to={`${category.id}`} className="font-semibold text-blue-600 underline">
                      {category.title}
                    </NavLink>
                  </td>
                  <td className="border border-gray-300 p-2 text-left">{postsQuantity}</td>
                  <td className="border border-gray-300 p-2 text-right">
                    <NavLink to={`${category.id}`} className="px-2 py-1 rounded bg-emerald-600 text-white hover:brightness-120">
                      Publicações
                    </NavLink>
                    <NavLink to={`${category.id}/edit`} className="px-2 py-1 rounded bg-cyan-600 text-white hover:brightness-120 ml-3">
                      Editar
                    </NavLink>
                    <button className="px-2 py-1 rounded bg-red-600 text-white hover:brightness-120 cursor-pointer ml-3" onClick={() => deleteCategory(category)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
