import { useContext } from "react";
import { Outlet } from "react-router";
import { databaseContext } from "../context/database-context";

export function AdminLayout() {
  const useDatabase = useContext(databaseContext);

  // Checa se tem um diretório selecionado, se não, bloqueia a visualização da página
  if (!useDatabase.directory) {
    return (
      <div className="p-4">
        <div className="border border-amber-600 bg-amber-100 rounded p-4 flex items-center justify-between mt-4">
          <p>
            <span className="text-xl">⚠️</span> Você precisa selecionar a pasta de dados para salvar as edições!
          </p>
          <button className="px-4 py-2 rounded bg-emerald-600 text-white cursor-pointer hover:brightness-120" onClick={useDatabase.selectDirectory}>
            Selecionar pasta
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
