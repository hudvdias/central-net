import { useContext } from "react";
import { useSearchParams } from "react-router";
import { databaseContext } from "../context/database-context";

export function SearchPage() {
  const useDatabase = useContext(databaseContext);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const posts = useDatabase.posts.filter((item) => item.title.includes(search!) || item.content.includes(search!));

  return (
    <div className="flex flex-col p-8 max-w-7xl overflow-y-auto">
      <p className="text-xl font-semibold mb-8">Pesquisa</p>

      {posts.length < 1 && <p className="p-4 bg-white shadow-lg rounded-lg">Nenhuma publicação encontrada.</p>}

      {/* posts container */}
      <div className="flex flex-col gap-4">
        {posts.map((post) => {
          const formattedDate = new Date(post.date).toLocaleDateString("pt-br");
          return (
            <div className="bg-white shadow-lg rounded-lg p-8">
              <div className="flex gap-4 mb-4 items-center">
                <p>{formattedDate}</p>
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
