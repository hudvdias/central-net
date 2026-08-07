import { useContext, useState, type SubmitEvent } from "react";
import { databaseContext } from "../../context/database-context";
import type { Category } from "../../types/category";

export function CreateCategoryPage() {
  const [title, setTitle] = useState("");
  const useDatabase = useContext(databaseContext);

  function createPost(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (title === "") return;
    const category: Category = {
      id: crypto.randomUUID(),
      title,
    };
    useDatabase.createCategory(category);
    setTitle("");
    alert("Categoria criada!\nSubstitua o arquivo 'categories.json'.");
  }

  return (
    <form className="flex flex-col p-4 max-w-7xl" onSubmit={(event) => createPost(event)}>
      <p className="text-xl font-semibold mb-8">Criar nova categoria</p>
      <label htmlFor="title">Título*</label>
      <input type="text" name="title" placeholder="Digite um título" value={title} onChange={(event) => setTitle(event.target.value)} required className="px-3 py-1 border rounded" />
      <button className="px-4 py-2 rounded bg-emerald-600 text-white cursor-pointer mt-4 hover:brightness-120">Criar</button>
    </form>
  );
}
