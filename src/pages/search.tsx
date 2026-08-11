import { useContext } from "react";
import { useSearchParams } from "react-router";
import { CardContent } from "../components/card-content";
import { databaseContext } from "../context/database-context";

export function SearchPage() {
  const useDatabase = useContext(databaseContext);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const posts = useDatabase.posts.filter((item) => item.title.includes(search!) || item.content.includes(search!));

  return (
    <div className="flex flex-col p-8 overflow-y-auto">
      <p className="text-xl font-semibold mb-8">Pesquisa - Resultados para "{search}"</p>

      {posts.length < 1 && <p className="p-4 bg-white shadow-lg rounded-lg">Nenhuma publicação encontrada.</p>}

      {/* posts container */}
      <div className="flex flex-col gap-4">
        {posts.map((post) => {
          return <CardContent post={post} initialOpen={true} />;
        })}
      </div>
    </div>
  );
}
