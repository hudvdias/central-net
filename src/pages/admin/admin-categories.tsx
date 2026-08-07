import { useContext } from "react";
import { NavLink } from "react-router";
import { databaseContext } from "../../context/database-context";
import type { Category } from "../../types/category";

export function AdminCategoriesPage() {
  const useDatabase = useContext(databaseContext);

  async function deleteCategory(category: Category) {
    console.log({ category });
    return;
  }

  return (
    <div className="flex flex-col p-4 max-w-7xl">
      <p className="text-xl font-semibold">Administração de Conteúdo</p>

      <div className="flex flex-col gap-8 mt-8">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">Categorias ({useDatabase.categories.length})</p>
          <NavLink to="/admin/create-category" className="py-2 px-4 rounded bg-emerald-600 text-white w-max hover:brightness-120">
            Criar nova categoria
          </NavLink>
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
              return (
                <tr key={category.id}>
                  <td className="border border-gray-300 p-2 text-left">{category.title}</td>
                  <td className="border border-gray-300 p-2 text-left">{0}</td>
                  <td className="border border-gray-300 p-2 text-right">
                    <button className="px-2 py-1 rounded bg-emerald-600 text-white hover:brightness-120 cursor-pointer">Editar</button>
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
