import { useContext } from "react";
import { Link, useParams } from "react-router";
import { databaseContext } from "../../../context/database-context";
import type { Post } from "../../../types/post";

export function AdminPostsPage() {
  const useDatabase = useContext(databaseContext);
  const { category_id } = useParams();
  const category = useDatabase.categories.find((item) => item.id === category_id);
  const posts = useDatabase.posts.filter((item) => item.categoryId === category_id);

  async function deletePost(post: Post) {
    const confirmation = confirm(`Confirma a exclusão desta publicação: ${post.title}?`);
    if (!confirmation) return;
    useDatabase.deletePost(post.id);
    alert("Publicação excluída.\n");
  }

  if (!category) {
    return (
      <div className="p-4 flex flex-col max-w-7xl">
        <p className="bg-red-100 border border-red-300 text-red-600 rounded p-4">⚠️ Categoria não encontrada.</p>
        <Link to="/admin" className="px-4 py-2 bg-emerald-600 text-white rounded mt-4 w-max">
          Retornar
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8">
      {/* breadcrumbs */}
      <div className="flex items-center gap-2 mb-4">
        <Link to="/admin" className="text-blue-600 underline">
          Administração de Conteúdo
        </Link>
        <span>{">"}</span>
        <span>
          Publicações em <b>{category.title}</b>
        </span>
      </div>

      <div className="flex flex-col gap-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">
            Publicações em {category.title} ({posts.length})
          </p>
          <Link to={`/admin/create-post?category_id=${category.id}`} className="py-2 px-4 rounded bg-emerald-600 text-white w-max hover:brightness-120">
            Criar nova publicação
          </Link>
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
            {posts.map((post) => {
              const formattedDate = new Date(post.date).toLocaleString("pt-br", { dateStyle: "short" });
              return (
                <tr key={post.id}>
                  <td className="border border-gray-300 p-2 text-left">{formattedDate}</td>
                  <td className="border border-gray-300 p-2 text-left">{post.title}</td>
                  <td className="border border-gray-300 p-2 text-right">
                    <Link to={`/admin/edit-post/${post.id}`} className="px-2 py-1 rounded bg-emerald-600 text-white hover:brightness-120 cursor-pointer">
                      Editar
                    </Link>
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
