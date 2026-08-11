import { useContext, useState, type SubmitEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { databaseContext } from "../../../context/database-context";
import type { Post } from "../../../types/post";

export function EditPostPage() {
  const useDatabase = useContext(databaseContext);
  const navigate = useNavigate();
  const { post_id } = useParams();
  const post = useDatabase.posts.find((item) => item.id === post_id);
  const category = useDatabase.categories.find((item) => item.id === post?.categoryId);

  const [title, setTitle] = useState(post?.title || "");
  const [date, setDate] = useState(post?.date.toISOString().split("T")[0] || new Date().toISOString().split("T")[0]);
  const [content, setContent] = useState(post?.content || "");
  const [categoryId, setCategoryId] = useState(post?.categoryId || "");

  async function editPost(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!post || !title || !content || !categoryId || !date) return;
    const newPost: Post = {
      id: post.id,
      title,
      content,
      date: new Date(date),
      categoryId,
    };
    useDatabase.editPost(newPost);
    setTitle("");
    alert("Publicação alterada com sucesso!");
    navigate(`/admin/${categoryId}`);
  }

  // Renderiza página de erro caso não exista publicação ou categoria.
  if (!category || !post) {
    return (
      <div className="p-4 flex flex-col">
        <p className="bg-red-100 border border-red-300 text-red-600 rounded p-4">⚠️ Categoria ou publicação não encontrada.</p>
        <Link to="/admin" className="px-4 py-2 bg-emerald-600 text-white rounded mt-4 w-max">
          Retornar
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 overflow-auto">
      {/* breadcrumbs */}
      <div className="flex items-center gap-2 mb-4">
        <Link to="/admin" className="text-blue-600 underline">
          Administração de Conteúdo
        </Link>
        <span>{">"}</span>
        {category && (
          <>
            <Link to={`/admin/${category.id}`} className="text-blue-600 underline">
              {category.title}
            </Link>
            <span>{">"}</span>
          </>
        )}
        <span>Editar Publicação</span>
      </div>

      {/* form */}
      <form className="flex flex-col p-8 bg-white shadow-lg rounded-lg" onSubmit={(event) => editPost(event)}>
        <p className="mb-4 font-semibold text-lg">Editar publicação</p>

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
        <textarea name="content" placeholder="Digite o conteúdo da publicação" required value={content} onChange={(event) => setContent(event.target.value)} className="h-96 p-4 leading-5 border rounded"></textarea>

        <button type="submit" className="px-4 py-2 rounded bg-emerald-600 text-white cursor-pointer mt-8 hover:brightness-120">
          Salvar alterações
        </button>
      </form>
    </div>
  );
}
