import { useContext } from "react";
import { Link, useParams } from "react-router";
import { databaseContext } from "../context/database-context";

export function ContentPage() {
  const useDatabase = useContext(databaseContext);
  const { slug } = useParams();
  const category = useDatabase.categories.find((item) => item.slug === slug);
  const posts = useDatabase.posts.filter((item) => item.categoryId === category?.id);

  if (!category) {
    return (
      <div className="p-4 flex flex-col max-w-7xl">
        <p className="bg-red-100 border border-red-300 text-red-600 rounded p-4">⚠️ Categoria não encontrada.</p>
        <Link to="/informativo" className="px-4 py-2 bg-emerald-600 text-white rounded mt-4 w-max">
          Retornar
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8 max-w-7xl overflow-y-auto">
      <p className="text-xl font-semibold mb-8">{category.title}</p>

      {posts.length < 1 && <p className="p-4 bg-white shadow-lg rounded-lg">Sem publicações.</p>}

      {/* posts container */}
      <div className="flex flex-col gap-4">
        {posts.map((post, index) => {
          const formattedDate = new Date(post.date).toLocaleDateString("pt-br");
          return (
            <div className="bg-white shadow-lg rounded-lg p-8">
              <div className="flex gap-4 mb-4 items-center">
                <p>{formattedDate}</p>
                {slug === "informativo" && index === 0 && <span className="rounded px-2 py-0.5 bg-red-500 text-white text-xs">Novo</span>}
              </div>
              <p className="text-lg font-semibold mb-4">{post.title}</p>
              <p className="whitespace-pre-wrap">{post.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
