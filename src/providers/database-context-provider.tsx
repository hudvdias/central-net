import { useEffect, useState, type ReactNode } from "react";
import { databaseContext } from "../context/database-context";
import type { Post } from "../types/post";
import { downloadPostsJson } from "../utils/download-json";

type Props = { children: ReactNode };

export function DatabaseContextProvider(props: Props) {
  const [posts, setPosts] = useState<Post[]>([]);

  // Cria um novo post
  async function createPost(post: Post) {
    const newPosts = [...posts, post];
    downloadPostsJson(newPosts);
  }

  // Deleta um post
  async function deletePost(postId: string) {
    const newPosts = posts.filter((item) => item.id !== postId);
    downloadPostsJson(newPosts);
  }

  // Carrega os posts ao abrir a página
  useEffect(() => {
    async function loadPosts() {
      const response = await fetch("/posts.json");
      const data: Post[] = await response.json();
      const formattedData: Post[] = data.map((post: Post) => ({
        ...post,
        date: new Date(post.date),
      }));
      const orderedData = formattedData.sort((a, b) => b.date.getTime() - a.date.getTime());
      setPosts(orderedData);
    }
    loadPosts();
  });

  return (
    <databaseContext.Provider value={{ posts, categories: [], createPost, deletePost }}>
      <>{props.children}</>
    </databaseContext.Provider>
  );
}
