import { useContext } from "react";
import { databaseContext } from "../context/database-context";

export function HomePage() {
  const useDatabase = useContext(databaseContext);

  return (
    <div className="flex flex-col p-4 max-w-7xl overflow-y-auto">
      <p className="text-xl font-semibold mb-4">Informativo</p>

      {useDatabase.posts.length < 1 && <p className="p-4 rounded border">Sem informativos.</p>}

      {/* posts container */}
      <div className="flex flex-col gap-4">
        {useDatabase.posts.map((post) => {
          const formattedDate = new Date(post.date).toLocaleDateString("pt-br");
          return (
            <div className="border border-gray-500 rounded-xl p-4">
              <div className="flex gap-4 mb-4 items-center">
                <p>{formattedDate}</p>
                <span className="rounded px-2 py-0.5 bg-red-500 text-white text-xs">Novo</span>
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
