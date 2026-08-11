import { useContext } from "react";
import { useSearchParams } from "react-router";
import { CardContent } from "../components/card-content";
import { databaseContext } from "../context/database-context";

export function SearchPage() {
  const useDatabase = useContext(databaseContext);
  const [searchParams] = useSearchParams();
  const search = normalizeText(searchParams.get("search") ?? "");
  const posts = useDatabase.posts.filter((item) => normalizeText(item.title).includes(search) || normalizeText(item.content).includes(search));

  // Ajusta o texto para ignorar maiúscula, minúscula e acento
  function normalizeText(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  if (search.length < 2) {
    return (
      <div className="flex flex-col p-8">
        <p>Use a barra de pesuisa para buscar.</p>
      </div>
    );
  }

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
