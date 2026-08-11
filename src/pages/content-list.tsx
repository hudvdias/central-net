import { useContext } from "react";
import { Link, useParams } from "react-router";
import { CardContent } from "../components/card-content";
import { databaseContext } from "../context/database-context";

export function ContentListPage() {
  const useDatabase = useContext(databaseContext);
  const { slug } = useParams();
  const category = useDatabase.categories.find((item) => item.slug === slug);
  const posts = useDatabase.posts.filter((item) => item.categoryId === category?.id);

  if (!category) {
    return (
      <div className="p-4 flex flex-col">
        <p className="bg-red-100 border border-red-300 text-red-600 rounded p-4">⚠️ Categoria não encontrada.</p>
        <Link to="/informativo" className="px-4 py-2 bg-emerald-600 text-white rounded mt-4 w-max">
          Retornar
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8 overflow-y-auto">
      <p className="text-xl font-semibold mb-8">{category.title}</p>

      {posts.length < 1 && <p className="p-4 bg-white shadow-lg rounded-lg">Sem publicações.</p>}

      {/* posts container */}
      <div className="flex flex-col gap-6">
        {posts.map((post) => {
          return <CardContent key={post.id} post={post} initialOpen={category.slug === "informativo" && true} />;
        })}
      </div>
    </div>
  );
}
