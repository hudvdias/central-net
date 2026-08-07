import { useContext } from "react";
import { NavLink } from "react-router";
import { databaseContext } from "../../context/database-context";
import type { Post } from "../../types/post";

export function AdminPage() {
  const useDatabase = useContext(databaseContext);

  async function deletePost(post: Post) {
    const confirmation = confirm(`Confirma a exclusão desta publicação: ${post.title}?`);
    if (!confirmation) return;
    useDatabase.deletePost(post.id);
    alert("Publicação excluída.\nSubstitua o arquivo 'posts.json'.");
  }

  return (
    <div className="flex flex-col p-4 max-w-7xl">
      <p className="text-xl font-semibold mb-8">Administração de Conteúdo</p>

      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">Publicações ({useDatabase.posts.length})</p>
          <NavLink to="/admin/create-post" className="py-2 px-4 rounded bg-emerald-600 text-white w-max hover:brightness-120">
            Criar nova publicação
          </NavLink>
        </div>

        <table className="table-auto border rounded border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left font-medium bg-gray-100">Data</th>
              <th className="border border-gray-300 p-2 text-left font-medium bg-gray-100">Título</th>
              <th className="border border-gray-300 p-2 text-right font-medium bg-gray-100">Ações</th>
            </tr>
          </thead>
          <tbody>
            {useDatabase.posts.map((post) => {
              const formattedDate = new Date(post.date).toLocaleString("pt-br", { dateStyle: "short" });
              return (
                <tr key={post.id}>
                  <td className="border border-gray-300 p-2 text-left">{formattedDate}</td>
                  <td className="border border-gray-300 p-2 text-left">{post.title}</td>
                  <td className="border border-gray-300 p-2 text-right">
                    <button className="px-2 py-1 rounded bg-emerald-600 text-white hover:brightness-120 cursor-pointer">Editar</button>
                    <button className="px-2 py-1 rounded bg-red-600 text-white hover:brightness-120 cursor-pointer ml-3" onClick={() => deletePost(post)}>
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
