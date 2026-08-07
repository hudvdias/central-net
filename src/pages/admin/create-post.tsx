import { useContext, useState, type SubmitEvent } from "react";
import { databaseContext } from "../../context/database-context";
import type { Post } from "../../types/post";

export function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const useDatabase = useContext(databaseContext);

  function createPost(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (title === "" || content === "") return;
    const post: Post = {
      id: crypto.randomUUID(),
      title,
      content,
      date: new Date(),
    };
    useDatabase.createPost(post);
    setTitle("");
    setContent("");
    alert("Publicação criada!\nSubstitua o arquivo 'posts.json'.");
  }

  return (
    <form className="flex flex-col p-4 max-w-7xl" onSubmit={(event) => createPost(event)}>
      <p className="text-xl font-semibold mb-8">Criar nova publicação</p>
      <label htmlFor="title">Título*</label>
      <input type="text" name="title" placeholder="Digite um título" value={title} onChange={(event) => setTitle(event.target.value)} required className="px-3 py-1 border rounded" />
      <label htmlFor="content" className="mt-4">
        Conteúdo*
      </label>
      <textarea name="content" placeholder="Digite o conteúdo da publicação" value={content} onChange={(event) => setContent(event.target.value)} required className="px-3 py-1 border rounded" />
      <button className="px-4 py-2 rounded bg-emerald-600 text-white cursor-pointer mt-4 hover:brightness-120">Criar</button>
    </form>
  );
}
