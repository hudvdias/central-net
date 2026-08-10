import { useContext, useState, type SubmitEvent } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import { databaseContext } from "../../../context/database-context";
import type { Post } from "../../../types/post";

export function CreatePostPage() {
  const useDatabase = useContext(databaseContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category_id = searchParams.get("category_id");
  const category = useDatabase.categories.find((item) => item.id === category_id);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(category?.id || "");

  function createPost(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title || !content || !categoryId || !date) return;
    const post: Post = {
      id: crypto.randomUUID(),
      title,
      content,
      date: new Date(date),
      categoryId,
    };
    useDatabase.createPost(post);
    setTitle("");
    alert("Publicação criada com sucesso!");
    navigate("/admin");
  }

  return (
    <div className="p-4">
      {/* breadcrumbs */}
      <div className="flex items-center gap-2 mb-4">
        <NavLink to="/admin" className="text-blue-600 underline">
          Administração de Conteúdo
        </NavLink>
        <span>{">"}</span>
        {category && (
          <>
            <NavLink to="/admin" className="text-blue-600 underline">
              {category.title}
            </NavLink>
            <span>{">"}</span>
          </>
        )}
        <span>Criar Publicação</span>
      </div>

      {/* form */}
      <form className="flex flex-col p-8 bg-white shadow-lg rounded-lg max-w-7xl" onSubmit={(event) => createPost(event)}>
        <p className="mb-4 font-semibold text-lg">Criar nova publicação</p>

        <label htmlFor="">Categoria*</label>
        <select name="category_id" value={categoryId} onChange={(event) => setCategoryId(event.currentTarget.value)} className="px-4 py-2 border rounded cursor-pointer" required>
          <option value="" disabled>
            Selecione uma categoria
          </option>
          {useDatabase.categories.map((item) => {
            return <option value={item.id}>{item.title}</option>;
          })}
        </select>

        <label htmlFor="date" className="mt-4">
          Data*
        </label>
        <input type="date" name="data" className="px-4 py-2 border rounded cursor-pointer" value={date} onChange={(event) => setDate(event.target.value)} />

        <label htmlFor="title" className="mt-4">
          Título*
        </label>
        <input type="text" name="title" placeholder="Digite um título" required value={title} onChange={(event) => setTitle(event.target.value)} className="px-4 py-2 border rounded" />

        <label htmlFor="content" className="mt-4">
          Conteúdo*
        </label>
        <textarea name="content" placeholder="Digite o conteúdo da publicação" required value={content} onChange={(event) => setContent(event.target.value)} className="h-96 px-4 py-2 border rounded"></textarea>

        <button type="submit" className="px-4 py-2 rounded bg-emerald-600 text-white cursor-pointer mt-8 hover:brightness-120">
          Criar
        </button>
      </form>
    </div>
  );
}
